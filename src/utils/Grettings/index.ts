const Greetings = () => {
  const hour = new Date().getHours();

  const greeting =
    hour >= 0 && hour <= 12
      ? 'Good Morning'
      : hour >= 13 && hour <= 17
      ? 'Good Afternoon'
      : hour >= 18 && hour <= 23 && 'Good Evening';
  return greeting;
};

export default Greetings;
