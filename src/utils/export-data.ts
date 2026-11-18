export type ExportFormat = "xlsx";

export interface ExportColumnDef<T> {
  header: string;
  accessor: (row: T) => string | number;
}

function escapeHtmlCell(value: string | number): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// No `xlsx` package is installed, so ".xlsx" export instead produces an
// HTML table served with an Excel-recognized MIME type. Excel opens it
// natively; it is not a real OOXML workbook, but needs no extra dependency.
function buildExcelHtml<T>(data: T[], columns: ExportColumnDef<T>[]): string {
  const head = columns.map((col) => `<th>${escapeHtmlCell(col.header)}</th>`).join("");
  const body = data
    .map(
      (row) =>
        `<tr>${columns
          .map((col) => `<td>${escapeHtmlCell(col.accessor(row))}</td>`)
          .join("")}</tr>`,
    )
    .join("");

  return `<html><head><meta charset="UTF-8" /></head><body><table border="1"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></body></html>`;
}

function downloadBlob(content: string, mimeType: string, fileName: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports rows to a downloadable Excel-compatible file.
 *
 * `fileName` should NOT include an extension — `.xls` is appended.
 */
// `format` is kept in the signature for call-site compatibility; Excel (.xls)
// is the only supported output now that CSV export has been removed.
export function exportData<T>(
  data: T[],
  columns: ExportColumnDef<T>[],
  fileName: string,
  format: ExportFormat = "xlsx",
): void {
  void format;
  downloadBlob(
    buildExcelHtml(data, columns),
    "application/vnd.ms-excel;charset=utf-8;",
    `${fileName}.xls`,
  );
}

export function dateStamp(): string {
  return new Date().toISOString().split("T")[0];
}
