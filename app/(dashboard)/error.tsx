"use client";

const Empty = ({ label }: { label: String }) => {
  return <p>{label}</p>;
};

const Error = () => {
  return <Empty label="Something went wrong." />;
};

export default Error;
