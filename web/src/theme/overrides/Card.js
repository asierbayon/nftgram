export default function Card() {
  return {
    overrides: {
      MuiCard: {
        root: {
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
          borderRadius: '50px',
        }
      }
    }
  };
}
