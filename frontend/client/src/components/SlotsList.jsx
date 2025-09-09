import { useEffect, useState } from "react";
import KdvrSection from "./KdvrSection";

export default function SlotsList({ kdvrFilter = "kdvr1" }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/slots/today")
      .then((res) => res.json())
      .then((data) => {
        console.log("API data:", data); 
        const filtered = data.filter((slot) => slot.kdvr === kdvrFilter);

       
        filtered.sort((a, b) => a.channel.localeCompare(b.channel));

        setSlots(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [kdvrFilter]);

  if (loading) return <p>Loading...</p>;

return (
  <div>
    {slots.length === 0 ? (
      <p>No slots found for this KDVR</p>
    ) : (
          <KdvrSection kdvrFilter={kdvrFilter} slots={slots}/>
    )}
  </div>
);

}
