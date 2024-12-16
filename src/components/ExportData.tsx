import { ExportDataProps, PropertyData } from '../types/types';
import * as XLSX from 'xlsx';

const ExportData = ({ properties }: ExportDataProps) => {
  const formatData = (data: PropertyData[]) => {
    return data.map(item => ({
      'Full Name': item.owner.fullName,
      'Phone Numbers': item.owner.phoneNumbers.map(p => p.number).join(', '),
      'Email Address': item.owner.emails.join(', '),
      'Full Address': `${item.address.houseNumber} ${item.address.street}, ${item.address.city}, ${item.address.state}, ${item.address.zip}`,
    }));
  };

  const exportToExcel = () => {
    const data = formatData(properties);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Properties');
    XLSX.writeFile(workbook, 'PropertiesData.xlsx');
  };

  return (
    <button
      onClick={exportToExcel}
      className="inline-flex justify-center items-center h-9 px-4 w-fit text-sm font-semibold bg-[#019344] text-white rounded hover:bg-[#1a5a38] transition-all"
    >
      Download Excel
    </button>
  );
};

export default ExportData;
