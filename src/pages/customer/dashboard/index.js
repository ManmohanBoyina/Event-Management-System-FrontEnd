import DashboardCard from "@/components/cards/DashboardCard";

export default function dashboard() {
  const cardsData = [
    {
      id: 1,
      imageSrc: "/images/landing.jpg",
      title: "Venues",
      subtitle: "Browse and book venues",
      route:"/customer/venue"
    },
    {
      id: 2,
      imageSrc: "/images/landing.jpg",
      title: "Activities",
      subtitle: "Browse and join activites",
      route:"/customer/venue"
    },
    {
      id: 3,
      imageSrc: "/images/landing.jpg",
      title: "People",
      subtitle: "Connect with fellow atheletes",
      route:"/customer/venue"
    },
  ];

  return (
    <main className="pt-4">
      <div className="flex justify-center space-x-10">
        {cardsData.map((card) => (
          <DashboardCard
            key={card.id}
            imageSrc={card.imageSrc}
            title={card.title}
            subtitle={card.subtitle}
            route = {card.route}
          />
        ))}
      </div>
    </main>
  );
}
dashboard.auth = true;
