export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
