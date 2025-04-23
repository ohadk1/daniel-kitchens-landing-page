
// Define the project structure
export interface Project {
  id: string;
  images: {
    url: string;
    alt: string;
  }[];
}

// Projects data without titles and descriptions
export const kitchenProjects: Project[] = [
  {
    id: "project1",
    images: [
      { url: "https://i.postimg.cc/rmpLKMQF/20220922-111717-Copy.jpg", alt: "מטבח מודרני" },
      { url: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg", alt: "מטבח מודרני - זווית נוספת" },
      { url: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg", alt: "מטבח מודרני - פרטים" }
    ]
  },
  {
    id: "project2",
    images: [
      { url: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg", alt: "מטבח בגוון טבעי" },
      { url: "https://i.postimg.cc/x1yr5cZ1/20221108-153941-01.jpg", alt: "מטבח בגוון טבעי - זווית נוספת" }
    ]
  },
  {
    id: "project3",
    images: [
      { url: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg", alt: "מטבח עם משטח עבודה" },
      { url: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg", alt: "מטבח עם משטח עבודה - זווית נוספת" }
    ]
  },
  {
    id: "project4",
    images: [
      { url: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg", alt: "מטבח בהתאמה אישית" },
      { url: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg", alt: "מטבח בהתאמה אישית - זווית נוספת" }
    ]
  },
  {
    id: "project5",
    images: [
      { url: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg", alt: "מטבח מודרני עם אי" },
      { url: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg", alt: "מטבח מודרני עם אי - זווית נוספת" }
    ]
  },
  {
    id: "project6",
    images: [
      { url: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg", alt: "מטבח עם מקרר משולב" },
      { url: "https://i.postimg.cc/x1yr5cZ1/20221108-153941-01.jpg", alt: "מטבח עם מקרר משולב - זווית נוספת" }
    ]
  },
  {
    id: "project7",
    images: [
      { url: "https://i.postimg.cc/rmpLKMQF/20220922-111717-Copy.jpg", alt: "מטבח נוסף 1" },
      { url: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg", alt: "מטבח נוסף 1 - זווית נוספת" }
    ]
  },
  {
    id: "project8",
    images: [
      { url: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg", alt: "מטבח נוסף 2" },
      { url: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg", alt: "מטבח נוסף 2 - זווית נוספת" }
    ]
  }
];
