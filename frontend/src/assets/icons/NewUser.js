import React from "react";

function NewUser({ fill }) {
  return (
    <svg
      fill={fill || '#fff'}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path d="M319.3 245.3c-58.8 0-106.7-47.8-106.7-106.7S260.5 32 319.3 32 426 79.9 426 138.7s-47.9 106.6-106.7 106.6zm0-181.3c-41.2 0-74.7 33.5-74.7 74.7s33.5 74.7 74.7 74.7 74.7-33.5 74.7-74.7c-.1-41.2-33.6-74.7-74.7-74.7zM495.3 480h-352c-8.8 0-16-7.2-16-16v-74.7c0-55.9 45.5-101.3 101.3-101.3h181.3c55.9 0 101.3 45.5 101.3 101.3V464c.1 8.8-7.1 16-15.9 16zm-336-32h320v-58.7c0-38.2-31.1-69.3-69.3-69.3H228.6c-38.2 0-69.3 31.1-69.3 69.3V448zM198.3 250.7H17c-8.8 0-16-7.2-16-16s7.2-16 16-16h181.3c8.8 0 16 7.2 16 16s-7.1 16-16 16z"></path>
      <path d="M91.7 325.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16v181.3c0 8.8-7.2 16-16 16s-16-7.1-16-16z"></path>
    </svg>
  );
}

export default NewUser;