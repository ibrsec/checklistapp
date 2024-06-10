"use client";
import useChekclistApi from "@/helpers/useChekclistApi";
import React, { useEffect, useState } from "react";

const CreateNewComp = ({editBox,setEditBox,contentForEdit}) => {
  const { createChecklist,editCheckList } = useChekclistApi();
  const [inputName, setInputName] = useState("");
  const [inputTime, setInputTime] = useState("");
  useEffect(()=>{
    setInputName(editBox ? contentForEdit.name : "");
    setInputTime(editBox ? contentForEdit.time : "");
  },[editBox])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.length > 50) {
      alert("Please make it shorter!");
      return;
    }
    if (!inputName) {
      alert("Plase enter a task name!");
      return;
    }
    if (inputTime.length > 5 || inputTime < 1) {
      alert(inputTime.length + " - Wrong Length => format should be : 00:00");
      return;
    }
    // if (inputTime < 1) {
    //   alert(inputTime.length + " - Wrong Length => format should be : 00:00");
    //   return;
    // }
    if (inputTime[2] !== ":") {
      alert("should contain ':' => format should be : 00:00");
      return;
    }

    


    const isNumber = (char) => {
      let result = false;
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((item) => {
        if (item === +char) {
          result = true;
        }
      });
      return result;
    };


    if (
      !(isNumber(inputTime[0]) &&
      isNumber(inputTime[1]) &&
      isNumber(inputTime[3]) &&
      isNumber(inputTime[4]))
    ) {
      alert("=> format should be : 00:00");
      return;
    }



    const body = {
      name: inputName,
      time: inputTime,
      status: false,
    };
    console.log(body);

    const bodyEdit = {
      name: inputName,
      time: inputTime,
    };
    console.log(bodyEdit);
    
    
    editBox ? editCheckList(contentForEdit?.id,body) : createChecklist(body);
    editBox && setEditBox(false);
    setInputName("");
    setInputTime("");
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            className="border m-3 p-2"
            type="text"
            name="inputName"
            id="inputName"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div>
          <input
            className="border m-3 p-2"
            type="text"
            name="inputTime"
            id="inputTime"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            placeholder="time - 00:00"
          />
        </div>
        <div>
          <button
            type="submit"
            className="py-2 px-5 bg-slate-400 text-slate-800 rounded-lg "
          >
            {editBox ? "Edit" : "Add new checklist"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewComp;
