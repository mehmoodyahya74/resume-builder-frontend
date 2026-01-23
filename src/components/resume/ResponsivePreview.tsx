export function ResponsivePreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center overflow-auto p-4">
      <div className="w-full max-w-[210mm]">
        {children}
      </div>
    </div>
  );
}
