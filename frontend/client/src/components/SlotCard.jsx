import getHeatmapColor from '../utils/slotColorGradient'
const SlotCard = ({ slotLabel, channel, slotData }) => {
  const baseStyle = "w-36 h-6 rounded-md shadow flex flex-col justify-center items-center";

  if (!slotData) {
    return (
      <div className={`${baseStyle} bg-white border border-dashed border-gray-300 text-gray-400`}>
        <p className="text-[10px] italic">Empty</p>
      </div>
    );
  }

  return (
    <div
      className={`${baseStyle} text-white text-[7px] truncate`}
      style={{ backgroundColor: getHeatmapColor(slotData.sizeMB) }}
    >
      <p className="truncate">{slotData.file}</p>
      <p>{slotData.sizeMB} MB</p>
    </div>
  );
};

export default SlotCard;
