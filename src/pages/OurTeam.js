import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Person = ({ name, role1 = "", image, role2 = "", nowrap = false, ob = false }) => {
  // console.log(image);
  return (
    <div className={`flex-auto md:flex flex-col ${ob && "w-full lg:w-44"} px-8 items-center text-center`}>
      {role1.length > 0 && (
        <div className={`mt-12 lg:mt-8 mb-4 uppercase tracking-widest text-xl ${nowrap && "whitespace-nowrap"}`}>
          {role1}
        </div>
      )}
      <div className={`min-w-max h-52 group flex justify-center`}>
        {image && (
          <img src={image} alt={name} className="h-44 w-44 aspect-square rounded-full mt-2 border-[#b5ecd8] group-hover:border-[#8becc8] transition-all ease-in-out border-8 box-border object-cover" />
        )}
      </div>
      <div className=" w-full mt-4 mb-1 font-bold text-lg">
        {name}
      </div>
      <div className="font-semibold text-indigo-700">{role2}</div>
    </div>
  );
};

const OurTeam = () => {
  const [team, setTeam] = useState([]);
  const [chair, setChair] = useState({});
  const [CoChair, setCoChair] = useState({});
  const [Secremale, setSecremale] = useState({});
  const [Secrefemale, setSecrefemale] = useState({});
  const [SecreScie, setSecreScie] = useState({});
  const [chief, setChief] = useState({});
  const [patron, setPatron] = useState({});
  const [deanStudent, setDeanStudent] = useState({});
  const [deanFinance, setDeanFinance] = useState({});
  const [studentCounsel, setStudentCounsel] = useState([]);
  const [generalCounsel, setGeneralCounsel] = useState([]);
  const [clubCat1, setClubCat1] = useState([]);
  const [clubCat2, setClubCat2] = useState([]);
  const [clubCat3, setClubCat3] = useState([]);
  const [years, setYears] = useState([]);
  const [yearButton, setYearButton] = useState([]);
  const [clickedYear, setClickedYear] = useState(`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`);
  const [endYear, setEndYear] = useState("");
  const startYear = 2015;

  useEffect(() => {
    setYears([]);
    if (window.innerWidth < 768) {
      for (let i = endYear - 1; i <= endYear; i++) {
        setYears((years) => [...years, `${i}-${i + 1}`]);
      }
    } else {
      for (let i = endYear - 6; i <= endYear; i++) {
        setYears((years) => [...years, `${i}-${i + 1}`]);
      }
    }
  }, [endYear]);

  useEffect(() => {
    if (yearButton) {
      for (let index = 0; index < yearButton.length; index++) {
        const element = yearButton[index];
        if (element.role === "Chairperson") {
          setChair(element);
        } else if (element.role === "Co-Chairperson") {
          setCoChair(element);
        } else if (element.role === "Secretary(Male)") {
          setSecremale(element);
        } else if (element.role === "Secretary(Female)") {
          setSecrefemale(element);
        } else if (
          element.role === "Secretary(Science)" ||
          element.role === "Associate Chairperson"
        ) {
          setSecreScie(element);
        }
      }
    }
  }, [yearButton]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/office-bearers")
      .then((res) => {
        // setTeam(res.data);
        let teams = res.data;
        let year_wise = {};
        for (let index = 0; index < teams.length; index++) {
          let element = teams[index];
          if (year_wise[element.year]) {
            year_wise[element.year].push(element);
          } else {
            year_wise[element.year] = [element];
          }
        }
        // console.log(year_wise);
        setTeam(year_wise);

        if (year_wise[`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`]) {
          setYearButton(year_wise[`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`]);
        }
        else {
          setClickedYear(`${new Date().getFullYear() - 1}-${new Date().getFullYear()}`);
          setYearButton(year_wise[`${new Date().getFullYear() - 1}-${new Date().getFullYear()}`]);
          setEndYear(new Date().getFullYear() - 1);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/suteam")
      .then((res) => {
        // setTeam(res.data);
        let team = res.data;
        let stuCoun = [];
        stuCoun = team.filter(
          (item) => item.role === "Student Welfare & Councelling"
        );
        let genCoun = team.filter(
          (item) => item.role === "General Functioning"
        );
        let clubCat1 = team.filter(
          (item) =>
            item.role ===
            "Tech Music, Dramatics Club, Astronomy Club, Animal Welfare Club, WDC, Martial Arts Club"
        );
        let clubCat2 = team.filter(
          (item) =>
            item.role ===
            "CAP & Nature Club, ELS, Entrepreneurs Club, NSS, Tamil Mandram, Fine Arts Club, YRC, Rotaract Club, Radio Hub"
        );
        let clubCat3 = team.filter(
          (item) =>
            item.role ===
            "Higher Education Forum, Pathshala Club, GLF, SRC, Industry (Alumni) - Interaction Forum, Book Readers Club"
        );

        for (let index = 0; index < team.length; index++) {
          let element = team[index];
          if (element.role === "Chief Patron") {
            console.log(element);
            setChief(element);
          } else if (element.role === "Patron") {
            console.log(element);
            setPatron(element);
          } else if (element.role === "Dean - Student Affairs") {
            console.log(element);
            setDeanStudent(element);
          } else if (element.role === "Associate Dean - Finance") {
            console.log(element);
            setDeanFinance(element);
          }
        }


        console.log(stuCoun);
        setStudentCounsel(stuCoun);
        console.log(genCoun);
        setGeneralCounsel(genCoun);
        console.log(clubCat1);
        setClubCat1(clubCat1);
        console.log(clubCat2);
        setClubCat2(clubCat2);
        console.log(clubCat3);
        setClubCat3(clubCat3);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16 w-full">
        Our <span className="font-bold">Team</span>
      </h1>
      <div className="flex flex-col items-center justify-center font-sans px-4 lg:px-0">
        <div className="flex-auto lg:flex flex-row mt-4 w-full">
          <Person
            name={chief.name}
            role1={chief.role}
            image={chief.image_url}
            role2={chief.position}
          />
          <Person
            name={patron.name}
            role1={patron.role}
            image={patron.image_url}
            role2={patron.position}
          />
          <Person
            name={deanStudent.name}
            role1={deanStudent.role}
            image={deanStudent.image_url}
            role2=""
          />
          <Person
            name={deanFinance.name}
            role1={deanFinance.role}
            image={deanFinance.image_url}
            role2=""
          />
        </div>
        <div className="flex-auto lg:flex flex-row items-center justify-center mt-24">
          <div className="font-bold w-full lg:w-1/2">
            <div className="font-bold text-2xl text-center">
              Student Welfare & Counselling
            </div>
            {studentCounsel.length > 0 && (
              <div className="flex-auto lg:flex flex-row font-normal font-sans">
                <Person
                  name={studentCounsel[0].name}
                  role1={studentCounsel[0].role}
                  image={studentCounsel[0].image_url}
                  role2=""
                />
                <Person
                  name={studentCounsel[1].name}
                  role1={studentCounsel[1].role}
                  image={studentCounsel[1].image_url}
                  role2=""
                />
              </div>
            )}
          </div>
          <div className="font-bold w-full lg:w-1/2">
            <div className="font-bold text-2xl text-center">
              General Counselling
            </div>
            {generalCounsel.length > 0 && (
              <div className="flex-auto lg:flex flex-row font-normal font-sans">
                <Person
                  name={generalCounsel[0].name}
                  role1={generalCounsel[0].role}
                  image={generalCounsel[0].image_url}
                  role2=""
                />
                <Person
                  name={generalCounsel[1].name}
                  role1={generalCounsel[1].role}
                  image={generalCounsel[1].image_url}
                  role2=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-auto lg:flex flex-col mt-12">
          <div className="font-bold text-center text-3xl">Club Activities</div>
          <div className="text-center text-2xl mt-8 uppercase tracking-widest">
            Associated Clubs
          </div>
          <div className="font-bold text-center text-xl mt-4">
            Tech Music , Dramatics Club , Astronomy Club , Animal Welfare Club ,
            WDC , Martial Arts Club
          </div>
          {clubCat1.length > 0 && (
            <div className="flex-auto lg:flex lg:justify-center flex-row mt-4 space-y-8 lg:space-y-0">
              <Person
                name={clubCat1[0].name}
                role2={clubCat1[0].role}
                image={clubCat1[0].image_url}
                role1=""
              />
              <Person
                name={clubCat1[1].name}
                role2={clubCat1[1].role}
                image={clubCat1[1].image_url}
                role1=""
              />
            </div>
          )}
          <div className="text-center text-2xl mt-16 uppercase tracking-widest">
            Associated Clubs
          </div>
          <div className="font-bold text-center text-xl mt-4">
            CAP & Nature Club, ELS, Entrepreneurs Club, NSS, Tamil Mandram, Fine
            Arts Club, YRC, Rotaract Club, Radio Hub
          </div>
          {clubCat2.length > 0 && (
            <div className="flex-auto lg:flex lg:justify-center flex-row mt-4 space-y-8 lg:space-y-0">
              <Person
                name={clubCat2[0].name}
                role2={clubCat2[0].role}
                image={clubCat2[0].image_url}
                role1=""
              />
              <Person
                name={clubCat2[1].name}
                role2={clubCat2[1].role}
                image={clubCat2[1].image_url}
                role1=""
              />
            </div>
          )}
          <div className="text-center text-2xl mt-16 uppercase tracking-widest">
            Associated Clubs
          </div>
          <div className="font-bold text-center text-xl mt-4">
            Higher Education Forum, Pathshala Club, GLF, SRC, Industry
            (Alumni)-Interaction Forum, Book Readers Club
          </div>
          {clubCat3.length > 0 && (
            <div className="flex-auto lg:flex lg:justify-center flex-row mt-4 space-y-8 lg:space-y-0">
              <Person
                name={clubCat3[0].name}
                role2={clubCat3[0].role}
                image={clubCat3[0].image_url}
                role1=""
              />
              <Person
                name={clubCat3[1].name}
                role2={clubCat3[1].role}
                image={clubCat3[1].image_url}
                role1=""
              />
            </div>
          )}
        </div>
        <div className="flex flex-col mt-24 w-full">
          <div className="font-bold text-3xl text-center">
            Office Bearers of the Students Union
          </div>
          <div className="flex flex-row justify-between items-end">
            <div className="w-10 lg:w-20 flex items-end justify-end lg:justify-start">
              <button
                className={`${years[0]?.split("-")[0] - 1 < startYear ? "hidden" : "block bg-gray-400 lg:hover:bg-gray-500 transition-all ease-in-out rounded-full p-1 lg:-mb-1 shadow-lg"}`}
                onClick={() => {
                  if (years[0].split("-")[0] - 1 < startYear) return;
                  setYears([`${years[0].split("-")[0] - 1}-${years[0].split("-")[0]}`, ...years.slice(0, years.length - 1)])
                }}
              >
                <BiChevronLeft className="text-[2rem] lg:text-[2.5rem] text-white" />
              </button>
            </div>
            <div className="flex flex-row items-center gap-x-4 lg:gap-x-8 justify-center mt-4 text-center">
              {years.map((year) => (
                <button
                  className={`rounded-2xl ${year === clickedYear ? "bg-black" : "bg-gray-400 lg:hover:bg-gray-500 transition-all ease-in-out"
                    } text-white px-4 py-2 mt-2`}
                  onClick={() => {
                    console.log(year);
                    console.log(team[year]);
                    setClickedYear(year);
                    setYearButton(team[year]);
                  }}
                >
                  {year.split("-")[0]}{" - "}{year.split("-")[1]}
                </button>
              ))}
            </div>
            <div className="w-10 lg:w-20 flex justify-start lg:justify-end items-end">
              <button
                className={`${years[years.length - 1]?.split("-")[1] > endYear ? "hidden" : "block bg-gray-400 lg:hover:bg-gray-500 transition-all ease-in-out rounded-full p-1 lg:-mb-1 shadow-lg"}`}
                onClick={() => {
                  if (years[years.length - 1].split("-")[1] > endYear) return;
                  setYears([...years.slice(1, years.length), `${years[years.length - 1].split("-")[1]}-${parseInt(years[years.length - 1].split("-")[1]) + 1}`])
                }}
              >
                <BiChevronRight className="text-[2rem] lg:text-[2.5rem] text-white" />
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mt-4 mb-12 w-full">
            <Person
              name={chair.name}
              image={chair.image_url}
              role1={chair.role}
              role2={chair.deptyos}
              nowrap
              ob
            />
            <Person
              name={CoChair.name}
              image={CoChair.image_url}
              role1={CoChair.role}
              role2={CoChair.deptyos}
              nowrap
              ob
            />
            <Person
              name={Secremale.name}
              image={Secremale.image_url}
              role1={Secremale.role}
              role2={Secremale.deptyos}
              nowrap
              ob
            />
            <Person
              name={Secrefemale.name}
              image={Secrefemale.image_url}
              role1={Secrefemale.role}
              role2={Secrefemale.deptyos}
              nowrap
              ob
            />
            <Person
              name={SecreScie.name}
              image={SecreScie.image_url}
              role1={SecreScie.role}
              role2={SecreScie.deptyos}
              ob
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OurTeam;
