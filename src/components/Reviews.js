import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Maria Torres",
      rating: 5,
      comment: "Excellent service! The team was punctual and the results are stunning."
    },
    {
      id: 2,
      name: "James O'Connor",
      rating: 4,
      comment: "Very professional and clean work. Would definitely hire again!"
    },
    {
      id: 3,
      name: "Samantha Lee",
      rating: 5,
      comment: "My house looks brand new! Thank you for the great job!"
    }
  ];

  return (
    <div style={styles.container}>
      <h2>What Our Clients Say</h2>
      {reviews.map((review) => (
        <div key={review.id} style={styles.card}>
          <h3>{review.name}</h3>
          <p style={styles.rating}>{"⭐".repeat(review.rating)}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#111',
    color: '#b59410',
    minHeight: '100vh'
  },
  card: {
    border: '1px solid #b59410',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#1a1a1a'
  },
  rating: {
    fontSize: 18
  }
};

export default Reviews;
