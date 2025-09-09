import React from "react";
import SlotCard from "./SlotCard";
import formatSlot from "../utils/slotFormatter";

// Define slots in proper chronological order
const expectedSlots = [
  "000000-020000",
  "020000-040000",
  "040000-060000",
  "060000-080000",
  "080000-100000",
  "100000-120000",
  "120000-140000",
  "140000-160000",
  "160000-180000",
  "180000-200000",
  "200000-220000",
  "220000-000000",
];

export default function KdvrSection({ kdvrFilter, slots }) {
  const channels = [...new Set(slots.map((s) => s.channel))];

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed border-collapse border border-gray-300 text-xs">
        <thead>
          <tr>
            <th className="sticky left-0 top-0 z-20 border border-gray-300 px-2 py-1 bg-orange-600 text-white">
              Channel
            </th>
            {expectedSlots.map((slot) => (  
              <th
                key={`header-${slot}`}
                className="sticky top-0 z-10 border border-gray-300 px-2 py-1 bg-orange-600 text-white"
              >
                {formatSlot(slot)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {channels.map((channel, rowIdx) => (
            <tr
              key={channel}
              className={rowIdx % 2 === 0 ? "bg-white" : "bg-orange-50"}
            >
              {/* Sticky channel name */}
              <td className="sticky left-0 z-10 border border-gray-300 text-xs  font-bold bg-orange-100 text-orange-800">
                {channel}
              </td>

              {/* Slot cells */}
              {expectedSlots.map((slotLabel) => {
                const slotData = slots.find(
                  (s) => s.channel === channel && s.slot === slotLabel
                );

                return (
                  <td
                    key={`${channel}-${slotLabel}`}
                    className="border border-gray-300 px-1 py-1  text-center"
                  >
                    <SlotCard 
                      slotLabel={slotLabel}
                      channel={channel}
                      slotData={slotData}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
