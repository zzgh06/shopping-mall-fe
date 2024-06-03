// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../style/register.style.css";
import userStore from "../store/userStore";
import useCommonUiStore from "../store/commonUiStore";
import ClipLoader from "react-spinners/ClipLoader";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const { user, registerUser, loading, error } = userStore();
  const { showToastMessage } = useCommonUiStore();

  const register = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData;

    if (password !== confirmPassword) {
      setPasswordError("비밀번호 중복확인이 일치하지 않습니다.");
      return;
    }

    if (!policy) {
      setPolicyError(true);
      return;
    }

    setPasswordError("");
    setPolicyError(false);
    const success = await registerUser({ name, email, password }, () => {
      showToastMessage("회원가입에 성공했습니다!", "success");
      navigate("/login");
    });

    if (!success) {
      showToastMessage("이미 가입된 이메일 입니다.", "error");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value, checked } = event.target;
    setFormData({ ...formData, [id]: id === "policy" ? checked : value });
  };

  if (loading){
    return (
      <div className="loading-container">
        <ClipLoader color="#11111" loading={loading} size={150} aria-label="Loading Spinner"/>
      </div>
    )
  }

  return (
    <Container className="register-area">
      {error && (
        <div>
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )}
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="이용약관에 동의합니다"
            id="policy"
            onChange={handleChange}
            isInvalid={policyError}
            checked={formData.policy}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
