import React, { useEffect, useState } from "react";
//Icon
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import departmentIcon from "../img/structure.png";
import { HiOutlineMail } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Validate
import { validate } from "./validate";
// Styles
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//
import { Link } from "react-router-dom";
// Axios
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    department: "",
    year: "",
    universityRollno: "",
    collegeId: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data]);

  const changeHandler = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    // setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/user/register", data)
      .then((res) => {
        notify(res.data.msg, "success");

        setData({
          name: "",
          email: "",
          password: "",
          course: "",
          department: "",
          year: "",
          universityRollno: "",
          collegeId: "",
        });
        setErrors({});
        setTouched({});
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        notify(error.response.data.msg, "error");
        setTouched({
          name: true,
          email: true,
          password: true,
          course: true,
          department: true,
          year: true,
          universityRollno: true,
          collegeId: true,
        });
      });

    // if (!Object.keys(errors).length) {

    //   const urlApi = `http://localhost:5000/api/v1/user/register`;
    //   const pushData = async () => {
    //     const responseA = axios.post(urlApi, data);
    //     const response = await toast.promise(responseA, {
    //       pending: "Check your data",
    //       success: "Checked!",
    //       error: "Something went wrong!",
    //     });
    //     if (response.data.ok) {
    //       notify("You signed Up successfully", "success");
    //     } else {
    //       notify("You have already registered, log in to your account", "warning");
    //     }
    //   };
    //   pushData();
    // } else {
    //   notify("Please Check fileds again", "error");
    //   setTouched({
    //     name: true,
    //     email: true,
    //     password: true,
    //     confirmPassword: true,
    //     IsAccepted: false,
    //   });
    // }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formLogin}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <h2>Sign Up</h2>
        <div>
          <div
            className={
              errors.name && touched.name
                ? styles.unCompleted
                : !errors.name && touched.name
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Name"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <div className="kush">
            < i class="fa-solid fa-user" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
            </div>
          </div>
          {errors.name && touched.name && (
            <span className={styles.error}>{errors.name}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.email && touched.email
                ? styles.unCompleted
                : !errors.email && touched.email
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="E-mail"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            < i class="fa-solid fa-envelope" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
          </div>
          {errors.email && touched.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.password && touched.password
                ? styles.unCompleted
                : !errors.password && touched.password
                ? styles.completed
                : undefined
            }
          >
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            < i class="fa-solid fa-lock" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
          </div>
          {errors.password && touched.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.course && touched.course
                ? styles.unCompleted
                : !errors.course && touched.course
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="course"
              value={data.course}
              placeholder="Course"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            < i class="fa-solid fa-book-open" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
          </div>
          {errors.course && touched.course && (
            <span className={styles.error}>{errors.course}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.collegeId && touched.collegeId
                ? styles.unCompleted
                : !errors.collegeId && touched.collegeId
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="collegeId"
              value={data.collegeId}
              placeholder="College ID"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            < i class="fa-solid fa-graduation-cap" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
          </div>
          {errors.collegeId && touched.collegeId && (
            <span className={styles.error}>{errors.collegeId}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.universityRollno && touched.universityRollno
                ? styles.unCompleted
                : !errors.universityRollno && touched.universityRollno
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="universityRollno"
              value={data.universityRollno}
              placeholder="University Roll No"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            < i class="fa-solid fa-id-card" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
          </div>
          {errors.universityRollno && touched.universityRollno && (
            <span className={styles.error}>{errors.universityRollno}</span>
          )}
        </div>
            
            <div>
              <div
                className={
                  errors.department && touched.department
                    ? styles.unCompleted
                    : !errors.department && touched.department
                    ? styles.completed
                    : undefined
                }
              >
                <input
                  type="text"
                  name="department"
                  value={data.department}
                  placeholder="Department"
                  onChange={changeHandler}
                  onFocus={focusHandler}
                  autoComplete="off"
                />
                <i i class="fa-solid fa-building-user" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
              </div>
              {errors.department && touched.department && (
                <span className={styles.error}>{errors.department}</span>
              )}
            </div>
            <div>
              <div
                className={
                  errors.year && touched.year
                    ? styles.unCompleted
                    : !errors.year && touched.year
                    ? styles.completed
                    : undefined
                }
              >
                <input
                  type="text"
                  name="year"
                  value={data.year}
                  placeholder="year"
                  onChange={changeHandler}
                  onFocus={focusHandler}
                  autoComplete="off"
                />
                <i i class="fa-solid fa-building-user" style={{
              color:"#4ad0cc" ,
              position: "absolute",
              maxWidth: "20px",
              maxHeight: "20px",
              left: "7px",
              top: "50%",
              transform: "translateY(-50%)",
              WebkitTransform: "translateY(-50%)",
              MozTransform: "translateY(-50%)",
              msTransform: "translateY(-50%)",
              OTransform: "translateY(-50%)"
            }}></i>
              </div>
              {errors.year && touched.year && (
                <span className={styles.error}>{errors.year}</span>
              )}
            </div>
        
        {/* <div>
          <div className={styles.terms}>
            <input
              type="checkbox"
              name="IsAccepted"
              value={data.IsAccepted}
              id="accept"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="accept">I accept terms of privacy policy</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && (
            <span className={styles.error}>{errors.IsAccepted}</span>
          )}
        </div> */}
        <div>
          <button type="submit">Create Account</button>
          <span
            style={{
              color: "#a29494",
              textAlign: "center",
              display: "inline-block",
              width: "100%",
            }}
          >
            Already have a account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
