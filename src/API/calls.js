import axios from "axios";
import { API_URL, CLUB_GENERAL_URL } from "./config";

export const fetchAllClubsLogo = () =>
  axios.get(`${API_URL}/clubs/with-logo`, {});

export const fetchClubDescription = () => axios.get(`${API_URL}/clubs`, {});

export const fetchClubGeneralDetails = (userId) =>
  axios.get(`${CLUB_GENERAL_URL}/${userId}`);
