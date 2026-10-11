import { Link } from "react-router-dom";

function MessMenu() {
  const menu = [
    {
      day: "Monday",
      breakfast: "Poha, Milk & Banana",
      lunch: "Dal, Rice, Roti & Mix Veg",
      snacks: "Tea & Biscuits",
      dinner: "Paneer, Roti & Salad",
    },
    {
      day: "Tuesday",
      breakfast: "Paratha, Curd & Tea",
      lunch: "Rajma, Rice & Roti",
      snacks: "Tea & Samosa",
      dinner: "Dal, Rice, Roti & Aloo Gobi",
    },
    {
      day: "Wednesday",
      breakfast: "Bread, Butter, Eggs & Milk",
      lunch: "Chole, Rice & Roti",
      snacks: "Tea & Biscuits",
      dinner: "Paneer Curry, Roti & Salad",
    },
    {
      day: "Thursday",
      breakfast: "Upma, Milk & Banana",
      lunch: "Dal, Rice, Roti & Bhindi",
      snacks: "Tea & Pakora",
      dinner: "Kadhi, Rice & Roti",
    },
    {
      day: "Friday",
      breakfast: "Aloo Paratha & Curd",
      lunch: "Dal Makhani, Rice & Roti",
      snacks: "Tea & Biscuits",
      dinner: "Mix Veg, Roti & Salad",
    },
    {
      day: "Saturday",
      breakfast: "Idli, Sambar & Chutney",
      lunch: "Dal, Rice, Roti & Soyabean",
      snacks: "Tea & Namkeen",
      dinner: "Chole Bhature & Salad",
    },
    {
      day: "Sunday",
      breakfast: "Puri, Aloo Sabzi & Tea",
      lunch: "Veg Biryani & Raita",
      snacks: "Tea & Samosa",
      dinner: "Special Dinner",
    },
  ];

  return (
    <div className="menu-page">

      <header className="menu-header">
        <div>
          <h1>🍴 Mess Menu</h1>
          <p>Weekly hostel meal schedule</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          ← Dashboard
        </Link>
      </header>

      <main className="menu-content">

        <div className="menu-title">
          <h2>Weekly Menu</h2>
          <p>Today's meals and upcoming meals</p>
        </div>

        <div className="menu-list">
          {menu.map((item) => (
            <div className="day-card" key={item.day}>

              <div className="day-title">
                <h3>{item.day}</h3>
              </div>

              <div className="meal">
                <span>🌅 Breakfast</span>
                <p>{item.breakfast}</p>
              </div>

              <div className="meal">
                <span>☀️ Lunch</span>
                <p>{item.lunch}</p>
              </div>

              <div className="meal">
                <span>☕ Snacks</span>
                <p>{item.snacks}</p>
              </div>

              <div className="meal">
                <span>🌙 Dinner</span>
                <p>{item.dinner}</p>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default MessMenu;