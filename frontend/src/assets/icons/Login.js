import React from "react";

function Login({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      fill={fill || '#fff'}
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path d="M192 245.3c-58.8 0-106.7-47.8-106.7-106.7S133.2 32 192 32s106.7 47.9 106.7 106.7S250.8 245.3 192 245.3zM192 64c-41.2 0-74.7 33.5-74.7 74.7s33.5 74.7 74.7 74.7 74.7-33.5 74.7-74.7S233.2 64 192 64zM368 480H16c-8.8 0-16-7.2-16-16v-74.7C0 333.5 45.5 288 101.3 288h181.3c55.9 0 101.3 45.5 101.3 101.3V464c.1 8.8-7.1 16-15.9 16zM32 448h320v-58.7c0-38.2-31.1-69.3-69.3-69.3H101.3C63.1 320 32 351.1 32 389.3V448z"></path>
    </svg>
  );
}

export default Login;