// Define the project structure
export interface Project {
  id: string;
  title?: string; // הכותרת תישמר אך לא תוצג
  description?: string; // אותו דבר
  coverImage: string;
  images: {
    url: string;
    alt: string;
  }[];
}

// Projects data – no need to display title/description
export const kitchenProjects: Project[] = [
  {
    id: "project1",
    title: "",
    description: "",
    coverImage: "https://i.postimg.cc/rmpLKMQF/20220922-111717-Copy.jpg",
    images: [
      { url: "https://i.postimg.cc/rmpLKMQF/20220922-111717-Copy.jpg", alt: "מטבח מודרני" },
      { url: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg", alt: "מטבח מודרני - זווית נוספת" },
      { url: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg", alt: "מטבח מודרני - פרטים" }
    ]
  },
  {
    id: "project2",
    title: "מטבח בגוון טבעי",
    description: "עיצוב מטבח בגוונים טבעיים המשלב עץ וחומרים איכותיים",
    coverImage: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg",
    images: [
      { url: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg", alt: "מטבח בגוון טבעי" },
      { url: "https://i.postimg.cc/x1yr5cZ1/20221108-153941-01.jpg", alt: "מטבח בגוון טבעי - זווית נוספת" }
    ]
  },
  {
    id: "project3",
    title: "מטבח עם משטח עבודה",
    description: "מטבח מרווח עם משטח עבודה גדול ופתרונות אחסון",
    coverImage: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg",
    images: [
      { url: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg", alt: "מטבח עם משטח עבודה" },
      { url: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg", alt: "מטבח עם משטח עבודה - זווית נוספת" }
    ]
  },
  {
    id: "project4",
    title: "מטבח בהתאמה אישית",
    description: "עיצוב מטבח מותאם אישית עם פתרונות פרקטיים",
    coverImage: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg",
    images: [
      { url: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg", alt: "מטבח בהתאמה אישית" },
      { url: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg", alt: "מטבח בהתאמה אישית - זווית נוספת" }
    ]
  },
  {
    id: "project5",
    title: "מטבח מודרני עם אי",
    description: "מטבח מודרני המשלב אי מרכזי לאירוח ובישול",
    coverImage: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg",
    images: [
      { url: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg", alt: "מטבח מודרני עם אי" },
      { url: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg", alt: "מטבח מודרני עם אי - זווית נוספת" }
    ]
  },
  {
    id: "project6",
    title: "מטבח עם מקרר משולב",
    description: "עיצוב הכולל מקרר משולב ביחידות האחסון",
    coverImage: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg",
    images: [
      { url: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg", alt: "מטבח עם מקרר משולב" },
      { url: "https://i.postimg.cc/x1yr5cZ1/20221108-153941-01.jpg", alt: "מטבח עם מקרר משולב - זווית נוספת" }
    ]
  }
];
