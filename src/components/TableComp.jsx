import useChekclistApi from "@/helpers/useChekclistApi";



const TableComp = ({checklist,date}) => {
 
    console.log("checklist = from comp = ",date, checklist);

  
    const resultCheckList = [...checklist]?.sort(function (a, b) {
      const hourA = a?.time.split(":")[0];
      const hourB = b?.time.split(":")[0];
      const minuteA = a?.time.split(":")[1];
      const minuteB = b?.time.split(":")[1];
      // compare hours first
      if (hourA < hourB) return -1;
      if (hourA > hourB) return 1;
      // compare minutes next
      if (minuteA < minuteB) return -1;
      if (minuteA > minuteB) return 1;
  
      // couldn't break the tie
      return 0;
    });
    console.log("resultCheckList====",date, resultCheckList);
  


    return (
        <div>
        <h4 className="text-center text-emerald-700 text-xl mb-3">{date}</h4>
        <table className="table border border-collapse">
        <thead>
          <tr>
            <th className="w-20 text-start">status</th>
            <th className="w-80 text-start">name</th>
            <th className="w-40 text-start">time</th>
          </tr>
        </thead>
        <tbody className="border">
          {resultCheckList?.map((item) => (
            <tr key={item?.id} className="table-row hover:bg-slate-300 transition-all ">
              <td>
                <input
                  type="checkbox"
                  name={`label-${item?.id}`}
                  id={`label-${item?.id}`}
                  checked={item?.status}
                  // onChange={() => toggleStatusTask(item?.id)}
                />
              </td>
              <td><label  htmlFor={`label-${item?.id}`}>{item?.name}</label></td>
              <td><label  htmlFor={`label-${item?.id}`}>{item?.time}</label></td>
              {/* <td>
                <button
                  className="py-1 px-2 bg-red-500 text-white hover:bg-red-400 active:bg-red-600 rounded-md text-sm transition-all"
                  // onClick={() => deleteChecklist(item?.id)}
                >
                  Delete
                </button>
              </td> */}
              {/* <td>
                <button
                  className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 rounded-md text-sm transition-all"
                  onClick={() => {
                    setEditBox(!editBox);
                    setContentForEdit(item)
                  }}
                >
                  {editBox && item?.id === contentForEdit?.id ? "Editting" : "Edit"}
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
        </div>
  )
}
export default TableComp
