interface HeadingProps {
  value: string;
}

const Heading = ({ value }: HeadingProps) => {
  return <h1>{value}</h1>
}

export default Heading;