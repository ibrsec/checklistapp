import {
  fetchFailEnd,
  fethStart,
  successNOdata,
  successgetAllDaysDatas,
  successgetDatas,
} from "@/lib/features/checklistSlice";
import { useDispatch, useSelector } from "react-redux";
// {
//     "name": "hayat",
//     "time": "06:12",
//     "status": false,
//     "id": "1"
//   }

const useChekclistApi = () => {
  const dispatch = useDispatch();

  const getAllDays = async () => {
    const url = `https://66619da963e6a0189feabf2c.mockapi.io/checklist`;
    try {
      dispatch(fethStart());
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error with get all days checklist");
      }
      console.log("gel all days response = ", response);
      const responseBody = await response.json();
      console.log("gel all daysden response body =", responseBody);
      dispatch(successgetAllDaysDatas(responseBody));
      return responseBody;
    } catch (error) {
      dispatch(fetchFailEnd());
      console.log("gel all days error = ", error);
    }
  };

  const startDayApi = async () => {
    const url = `https://66619da963e6a0189feabf2c.mockapi.io/checklist`;
    const allDays = await getAllDays();
    console.log("allDays", allDays);
    const dates = allDays?.map((item) => {
      const date = new Date(item?.date).toLocaleString("tr-TR");
      return date.slice(0, date.indexOf(" "));
    });
    console.log("dates=", dates);
    let today = new Date().toLocaleString("tr-TR");
    today = today.slice(0, today.indexOf(" "));
    console.log("dtoday=", today);
    const isthereTodaysDate = dates.some((item) => {
      return item === today;
    });

    console.log("isthereTodaysDate =", isthereTodaysDate);

    if (isthereTodaysDate) {
      console.log("there is a today's date checklist!");
      return;
    }
    const body = {
      date: new Date(),
      tasks: allDays?.reduce((max, current) => {
        if (current?.date > max?.date) {
          max = current;
        }
        return max;
      }, allDays[0])?.tasks.map(item=> ({
        ...item,status:false
      })),
    };

    // const body = {
    //   date: new Date(),
    //   tasks: [
    //     {
    //       name: "hayat",
    //       time: "06:12",
    //       status: false,
    //       id: "1",
    //     },
    //     {
    //       name: "hayat",
    //       time: "06:12",
    //       status: false,
    //       id: "2",
    //     },
    //     {
    //       name: "hayat",
    //       time: "06:12",
    //       status: false,
    //       id: "3",
    //     },
    //     {
    //       name: "hayat",
    //       time: "06:12",
    //       status: false,
    //       id: "4",
    //     },
    //   ],
    // };
    try {
      dispatch(fethStart());
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Error with post new checklist");
      }
      console.log("start day api response = ", response);
      dispatch(successNOdata());
      getAllDays();
      getChecklists();
    } catch (error) {
      dispatch(fetchFailEnd());
      console.log(error);
    }
  };

  const createChecklist = async (body) => {
    let today = new Date().toLocaleString("tr-TR");
    today = today.slice(0, today.indexOf(" "));
    console.log("dtoday=", today);

    const allDays = await getAllDays();
    console.log("allDays", allDays);
    const id = allDays
      ?.map((item) => {
        const date = new Date(item?.date).toLocaleString("tr-TR");
        return { id: item?.id, date: date.slice(0, date.indexOf(" ")) };
      })
      .find((item) => item?.date === today)?.id;
    console.log("id=", id);
    if (!id) {
      console.log("First you must start the day!");
    }
    const url = `https://66619da963e6a0189feabf2c.mockapi.io/checklist/${id}`;

    const lastBody = {
      tasks: [
        ...allDays?.filter((item) => item?.id === id)[0]?.tasks,
        { id: new Date().getTime(), ...body },
      ],
    };

    console.log(lastBody);

    try {
      dispatch(fethStart());
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastBody),
      });
      if (!response.ok) {
        throw new Error("Error with put new checklist item");
      }
      console.log(response);
      dispatch(successNOdata());
      getChecklists();
    } catch (error) {
      dispatch(fetchFailEnd());
      console.log(error);
    }
  };
  const deleteChecklist = async (taskId) => {
    let today = new Date().toLocaleString("tr-TR");
    today = today.slice(0, today.indexOf(" "));
    console.log("dtoday=", today);

    const allDays = await getAllDays();
    console.log("allDays", allDays);
    const id = allDays
      ?.map((item) => {
        const date = new Date(item?.date).toLocaleString("tr-TR");
        return { id: item?.id, date: date.slice(0, date.indexOf(" ")) };
      })
      .find((item) => item?.date === today)?.id;
    console.log("id=", id);
    if (!id) {
      console.log("First you must start the day!");
    }
    const url = `https://66619da963e6a0189feabf2c.mockapi.io/checklist/${id}`;

    const lastBody = {
      tasks: [
        ...allDays?.filter((item) => item?.id === id)[0]?.tasks.filter(item=>item?.id !== taskId),
      ],
    };

    console.log(lastBody);

    try {
      dispatch(fethStart());
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastBody),
      });
      if (!response.ok) {
        throw new Error("Error with put delete checklist item");
      }
      console.log(response);
      dispatch(successNOdata());
      getChecklists();
    } catch (error) {
      dispatch(fetchFailEnd());
      console.log(error);
    }
  };
  const toggleStatusTask = async (taskId) => {
    let today = new Date().toLocaleString("tr-TR");
    today = today.slice(0, today.indexOf(" "));
    console.log("dtoday=", today);

    const allDays = await getAllDays();
    console.log("allDays", allDays);
    const id = allDays
      ?.map((item) => {
        const date = new Date(item?.date).toLocaleString("tr-TR");
        return { id: item?.id, date: date.slice(0, date.indexOf(" ")) };
      })
      .find((item) => item?.date === today)?.id;
    console.log("id=", id);
    if (!id) {
      console.log("First you must start the day!");
    }
    const url = `https://66619da963e6a0189feabf2c.mockapi.io/checklist/${id}`;

    const existTasks = allDays?.filter((item) => item?.id === id)[0]?.tasks;
    const lastBody = {
      tasks: [
        ...existTasks.filter(item=> item?.id !== taskId), {...existTasks.filter(item=> item?.id === taskId)[0],status:!existTasks.filter(item=> item?.id === taskId)[0].status}
      ],
    };

    console.log(lastBody);

    try {
      dispatch(fethStart());
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastBody),
      });
      if (!response.ok) {
        throw new Error("Error with put toggle status checklist item");
      }
      console.log(response);
      dispatch(successNOdata());
      getChecklists();
    } catch (error) {
      dispatch(fetchFailEnd());
      console.log(error);
    }
  };
  const editCheckList = async (taskId,body) => {
    let today = new Date().toLocaleString("tr-TR");
    today = today.slice(0, today.indexOf(" "));
    console.log("dtoday=", today);

    const allDays = await getAllDays();
    console.log("allDays", allDays);
    const id = allDays
      ?.map((item) => {
        const date = new Date(item?.date).toLocaleString("tr-TR");
        return { id: item?.id, date: date.slice(0, date.indexOf(" ")) };
      })
      .find((item) => item?.date === today)?.id;
    console.log("id=", id);
    if (!id) {
      console.log("First you must start the day!");
    }
    const url = `https://66619da963e6a0189feabf2c.mockapi.io/checklist/${id}`;

    const existTasks = allDays?.filter((item) => item?.id === id)[0]?.tasks;
    const lastBody = {
      tasks: [
        ...existTasks.filter(item=> item?.id !== taskId), {...existTasks.filter(item=> item?.id === taskId)[0],name:body?.name,time:body?.time}
      ],
    };

    console.log(lastBody);

    try {
      dispatch(fethStart());
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastBody),
      });
      if (!response.ok) {
        throw new Error("Error with put edit checklist item");
      }
      console.log(response);
      dispatch(successNOdata());
      getChecklists();
    } catch (error) {
      dispatch(fetchFailEnd());
      console.log(error);
    }
  };

  const getChecklists = async () => {
    const url = `https://66619da963e6a0189feabf2c.mockapi.io/checklist`;
    try {
      dispatch(fethStart());
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Error with getting checklist datas");
      }
      console.log(response);
      const responseBody = await response.json();
      console.log("responsebody getden", responseBody);

      let today = new Date().toLocaleString("tr-TR");
      today = today.slice(0, today.indexOf(" "));
      console.log("today date from get loop=", today);

      const result = responseBody?.filter((item) => {
        let date = new Date(item?.date).toLocaleString("tr-TR");
        date = date.slice(0, date.indexOf(" "));
        console.log("date from get loop=", date);

        if (today === date) {
          console.log("return item worked");
          return item;
        }
      });

const resultItems = result.length> 0 ? result[0]?.tasks : [];
console.log('resultItems = ', resultItems)
      dispatch(successgetDatas(resultItems));
    } catch (error) {
      dispatch(fetchFailEnd());
      console.log(error);
    }
  };

  return { createChecklist, getAllDays, getChecklists, startDayApi,deleteChecklist,toggleStatusTask,editCheckList };
};

export default useChekclistApi;
