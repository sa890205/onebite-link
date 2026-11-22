export default function LinkUrlInput() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="url" className="text-sm font-medium">
        링크
      </label>
      <input
        id="url"
        name="url"
        type="url"
        required
        placeholder="https://example.com"
        className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm outline-none focus:border-foreground dark:border-zinc-700"
      />
    </div>
  );
}
