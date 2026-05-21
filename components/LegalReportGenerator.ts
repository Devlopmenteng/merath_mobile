/**
 * @file components/LegalReportGenerator.ts
 * @description Generate legal reports for inheritance calculations
 */

export interface LegalReport {
  title: string;
  date: string;
  madhab: string;
  heirs: Array<{
    name: string;
    share: string;
    amount: number;
  }>;
  totalEstate: number;
  notes: string[];
}

export const generateLegalReport = (data: any): LegalReport => {
  return {
    title: 'تقرير توزيع الميراث الشرعي',
    date: new Date().toISOString().split('T')[0],
    madhab: data.madhab || 'hanafi',
    heirs: data.heirs || [],
    totalEstate: data.totalEstate || 0,
    notes: [
      'هذا التقرير يعتمد على الفقه الإسلامي',
      'يجب مراجعة متخصص شرعي للتأكد',
    ],
  };
};

export const formatReportAsText = (report: LegalReport): string => {
  let text = `${report.title}\n`;
  text += `التاريخ: ${report.date}\n`;
  text += `المذهب: ${report.madhab}\n`;
  text += `إجمالي التركة: ${report.totalEstate}\n\n`;
  text += `الوارثون:\n`;

  report.heirs.forEach((heir) => {
    text += `- ${heir.name}: ${heir.share} (${heir.amount})\n`;
  });

  text += `\nملاحظات:\n`;
  report.notes.forEach((note) => {
    text += `- ${note}\n`;
  });

  return text;
};
