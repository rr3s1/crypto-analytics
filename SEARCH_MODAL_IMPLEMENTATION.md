# Search Modal (Command Palette) — Implementation Notes

This document explains, step-by-step, how the **Search Modal** was implemented in this project (keyboard shortcut, debounced server search, SWR, trending fallback, and navigation).

---

## 1) Install the required packages

The search modal relies on:

- **SWR**: caching + race-condition-safe request orchestration for “search as you type”.
- **react-use**: `useKey` (Cmd/Ctrl + K) and `useDebounce` (300ms debounce buffer).
- **cmdk**: command palette engine used by shadcn’s `Command*` wrappers.
- **@radix-ui/react-dialog**: accessible modal primitive used by `CommandDialog`.

Installed:

- `swr`
- `react-use`
- `cmdk`
- `@radix-ui/react-dialog`

---

## 2) Add the UI primitives (shadcn-style wrappers)

To keep the UI consistent with the existing component patterns, two shadcn-like wrappers were added under `components/ui/`.

### 2.1) `components/ui/dialog.tsx`

- Wraps Radix Dialog primitives (`Dialog`, `DialogContent`, `DialogTitle`, etc.)
- Provides overlay + content styles
- Includes a close button
- Enables **accessibility** expectations (notably: `DialogContent` expects a `DialogTitle`)

File:

- `components/ui/dialog.tsx`

### 2.2) `components/ui/command.tsx`

- Wraps `cmdk` primitives into:
  - `CommandDialog`
  - `CommandInput`
  - `CommandList`
  - `CommandGroup`
  - `CommandItem`
  - `CommandEmpty`
- Uses `Dialog` internally so the command palette is rendered inside an accessible modal.
- Adds an **offscreen** `<DialogTitle className="sr-only">Search coins</DialogTitle>` to satisfy Radix accessibility requirements.

File:

- `components/ui/command.tsx`

---

## 3) Implement the API search helper (`searchCoins`)

The search UI needs **name/symbol matches plus market data** (24h change). CoinGecko’s `/search` endpoint alone does not include price / 24h change, so the helper does a **two-step merge**:

1) Fetch `/search?query=...` → returns matching coin ids + metadata.
2) Fetch `/coins/markets?vs_currency=usd&ids=...&price_change_percentage=24h` → returns price + 24h % change.
3) Merge results into `SearchCoin[]`.

File:

- `lib/coingecko.actions.ts`

Export:

- `export async function searchCoins(query: string): Promise<SearchCoin[]>`

Notes:

- The helper trims input and returns `[]` for an empty query.
- The SWR layer handles caching and avoids race conditions when typing quickly.

---

## 4) Create the Search Modal component

File:

- `components/SearchModal.tsx`

### 4.1) Component props

The modal accepts trending coins from the parent:

- `initialTrendingCoins: TrendingCoin[]`

This powers the “idle mode” list when the user opens the modal without typing.

### 4.2) Keyboard shortcut: Cmd/Ctrl + K

Implemented with `useKey` from `react-use`:

- Global listener checks:
  - `event.key.toLowerCase() === 'k'`
  - `event.metaKey || event.ctrlKey`
- Calls `event.preventDefault()` and toggles modal open state.

### 4.3) Debounce buffer (300ms)

Two pieces of state are used:

- `searchQuery`: updates immediately while the user types (UI stays responsive).
- `debouncedQuery`: only updates after 300ms of inactivity.

Implemented with:

- `useDebounce(..., 300, [searchQuery])`

### 4.4) SWR data fetching (server-side filtering)

SWR key strategy:

- If `debouncedQuery` is empty → pass `null` to SWR to **pause** fetching.
- If non-empty → use a stable key: `['coin-search', debouncedQuery]`

Fetcher:

- `([, query]) => searchCoins(query as string)`

Result:

- `data: searchResults` (defaults to `[]`)
- `isValidating: isSearching`

### 4.5) Two interface modes

The modal renders different content based on query state:

- **Idle mode**
  - Condition: `!debouncedQuery`
  - Renders: trending coins list (limited to `TRENDING_LIMIT`)
- **Searching mode**
  - Condition: `debouncedQuery` exists
  - Renders: SWR `searchResults`
  - Loading: shows `Searching...` while `isValidating`
  - Empty: shows `No coins found.` when results are empty

### 4.6) Search item UI (reusable list row)

`SearchItem` renders:

- Coin image
- Name + symbol
- 24h change badge (green if > 0, red if < 0)

It supports both data shapes:

- `SearchCoin` (search results)
- `TrendingCoin['item']` (trending list)

Type used (already present in `type.d.ts`):

- `type SearchItemCoin = SearchCoin | TrendingCoin['item']`

### 4.7) Navigation

When an item is selected:

- Close modal
- Reset `searchQuery` + `debouncedQuery`
- Navigate via Next Router:
  - `router.push(/coins/${coinId})`

---

## 5) Wire the Search Modal into the app shell

### 5.1) Fetch trending coins in `app/layout.tsx` (Server Component)

Because the `Header` is rendered in the root layout, trending coins are fetched once at the layout level and passed down:

- `fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300)`
- On failure, it falls back to `[]` to keep the layout stable.

File:

- `app/layout.tsx`

### 5.2) Render SearchModal inside the Header

`Header` now accepts:

- `({ trendingCoins = [] }: HeaderProps)`

And renders:

- `<SearchModal initialTrendingCoins={trendingCoins} />`

File:

- `components/Header.tsx`

---

## 6) Styling

The project already contains dedicated styles for the search modal under:

- `app/globals.css`
  - `#search-modal { ... }`
  - `.dialog .search-item { ... }`
  - `.custom-scrollbar { ... }`

The Search Modal component uses these existing class names:

- `trigger`, `kbd`, `dialog`, `cmd-input`, `list`, `group`, `search-item`, `coin-info`, `coin-symbol`, `coin-change`

---

## 7) Fixes & gotchas encountered

### 7.1) Radix Dialog accessibility warning

Radix warns if `DialogContent` is rendered without a `DialogTitle`.

Fix:

- `components/ui/command.tsx` adds:
  - `<DialogTitle className="sr-only">Search coins</DialogTitle>`

### 7.2) Radix Select hydration mismatch

You may see hydration warnings like `aria-controls="radix-..."` mismatch. This happens when SSR markup doesn’t match the client because Radix generates ids that differ between server and client.

Fix applied in this codebase:

- `components/Converter.tsx` defers rendering the Radix `<Select />` until after mount (`mounted` state).
- A visually similar placeholder is rendered on the server and during the first client paint so SSR and hydration match.

---

## 8) Quick verification checklist

- **Open modal** with:
  - Click “Search”
  - Press **Cmd+K** (Mac) / **Ctrl+K** (Windows)
- **Idle state** shows trending coins (if available).
- Typing triggers **debounced** search (wait ~300ms).
- Shows:
  - `Searching...` while validating
  - `No coins found.` if empty results
  - Results list otherwise
- Selecting a coin navigates to:
  - `/coins/[coinId]`

