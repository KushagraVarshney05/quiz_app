import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../img/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const {token} = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5000/email/${token}`;
				const { data}= await axios.get(url);
				
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [token]);

	return (
		<>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found
                </h1>
                

			)}
		</>
	);
};

export default EmailVerify;