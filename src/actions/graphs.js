import React, { useEffect } from "react";
import CONFIG from "../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  toogleAusblick,
  toogleBlue,
  toogleErgebnis,
  toogleGuageAngle,
  toogleGwHandel,
  toogleInvestitionen,
  toogleKwHandel,
  toogleRed,
  toogleRmHandel,
  toogleShop,
  toogleVermietung,
  toogleWerkstatt,
  toogleWwHandel,
} from "./../store/actions/graphActions";
function GraphInit() {
  const dispatch = useDispatch();

  const formatDateFilter = () => {
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 3);
    let today = new Date();
    let startDate = `${oneYearFromNow.getFullYear()}-${
      oneYearFromNow.getMonth() + 1
    }-${oneYearFromNow.getDate()}`;
    let endDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    return {
      startDate,
      endDate,
    };
  };
  useEffect(() => {
    const blue = async () => {
      try {
        let resp = await axios.get(
          `${CONFIG.BAROMETER_API_URL}/report?start=${
            formatDateFilter().startDate
          }&end=${formatDateFilter().endDate}`
        );
        let xAxis = [];
        let yAxis = [];
        let real = [];
        resp.data.Score.forEach((ele, index) => {
          yAxis.push(ele.y);
          xAxis.push(new Date(ele.x));
          real.push(ele);
        });
        // setData(yAxis);
        // setLabels(xAxis);

        let dk =
          (resp.data.Score[resp.data.Score.length - 1].y -
            resp.data.Score[resp.data.Score.length - 2].y) /
          resp.data.Score[resp.data.Score.length - 2].y;

        dispatch(toogleBlue("test", yAxis, xAxis, dk.toFixed(1) + "%", real));

        // setDevelopemntIncreasement(dk.toFixed(1) + "%");
      } catch (error) {}
    };

    blue();
    return () => {};
  }, []);

  useEffect(() => {
    const red = async () => {
      try {
        let resp = await axios.get(
          `${CONFIG.BAROMETER_API_URL}/ifo?start=${
            formatDateFilter().startDate
          }&end=${formatDateFilter().endDate}`
        );
        let xAxis = [];
        let yAxis = [];
        let real = [];
        resp.data["Ifo-data"].forEach((ele, index) => {
          yAxis.push(ele.y);
          xAxis.push(new Date(ele.x));
          real.push(ele);
        });
        // setData(yAxis);
        // setLabels(xAxis);

        let dk =
          (resp.data["Ifo-data"][resp.data["Ifo-data"].length - 1].y -
            resp.data["Ifo-data"][resp.data["Ifo-data"].length - 2].y) /
          resp.data["Ifo-data"][resp.data["Ifo-data"].length - 2].y;
        console.log("red data", real);
        dispatch(toogleRed("test", yAxis, xAxis, dk.toFixed(1) + "%", real));

        // setDevelopemntIncreasement(dk.toFixed(1) + "%");
      } catch (error) {}
    };
    red();
    return () => {};
  }, []);

  useEffect(() => {
    const main = async () => {
      let arr = [
        { name: "RM-Handel", fun: toogleRmHandel },
        { name: "WW-Handel", fun: toogleWwHandel },
        { name: "KW-Handel", fun: toogleKwHandel },
        { name: "GW-Handel", fun: toogleGwHandel },
        { name: "Werkstatt", fun: toogleWerkstatt },
        { name: "Vermietung", fun: toogleVermietung },
        { name: "Shop", fun: toogleShop },
        { name: "Ergebnis", fun: toogleErgebnis },
        { name: "investitionen", fun: toogleInvestitionen },
        { name: "ausblick", fun: toogleAusblick },
      ];

      arr.map((ele) => {
        var config = {
          method: "get",
          url: `${
            CONFIG.BAROMETER_API_URL
          }/report?category=${ele.name.toLowerCase()}&start=${
            formatDateFilter().startDate
          }&end=${formatDateFilter().endDate}`,
          headers: {},
        };

        axios(config)
          .then(function (response) {
            let xAxis = [];
            let yAxis = [];
            let real = [];
            response.data.Score.forEach((ele, index) => {
              yAxis.push(ele.y);
              xAxis.push(new Date(ele.x));
              real.push(ele);
            });
            dispatch(ele.fun(yAxis, xAxis, real));
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    main();
    return () => {};
  }, []);

  useEffect(() => {
    const getGuageAngle = () => {
      var config = {
        method: "get",
        url: `${CONFIG.BAROMETER_API_URL}/summary`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios(config)
        .then(function (response) {
          dispatch(toogleGuageAngle(response.data.score));
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getGuageAngle();
    return () => {};
  }, []);

  return null;
}

export default GraphInit;
