import { initializeApp } from "@firebase/app";
import { getDatabase, ref, child, onValue } from "@firebase/database";

export const storeFirebase = {
  api: "http://14.225.205.222:8800",
  videoCallApi: "",
  notice: "",
};
const firebaseConfig = {
  apiKey: "AIzaSyAtgb9tbS_NG3rVkLNsb6mIwL2EyhqDHX4",
  authDomain: "connect-center-24b1e.firebaseapp.com",
  databaseURL: "https://connect-center-24b1e-default-rtdb.firebaseio.com",
  projectId: "connect-center-24b1e",
  storageBucket: "connect-center-24b1e.appspot.com",
  messagingSenderId: "545436821194",
  appId: "1:545436821194:web:7f60f9b5c69271451ef633",
  measurementId: "G-WZPVZPY9XQ",
};

initializeApp(firebaseConfig);

// const db = database.getDatabase();

export default function () {
  // const refApp = ref(getDatabase(), "learning_app");

  // onValue(child(refApp, "config"), (snapshot) => {
  //   const data = snapshot.val();
  //   console.log(data, "api");
  //   const dataUpdate = { init: true };
  //   if (data.notice) {
  //     dataUpdate.notice = data.notice;
  //   }
  //   storeFirebase.api = data.api;
  //   storeFirebase.videoCallApi = data.videoCallApi;
  //   storeFirebase.notice = data.notice;
  //   localStorage.setItem("videoCallApi", data.videoCallApi);
  //   localStorage.setItem("api", data.api);
  // });
}
