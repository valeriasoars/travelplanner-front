import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../../componentes/nav-bar/nav-bar.component";

interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface Story {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}

interface Highlight {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  authorImage: string;
}

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [RouterLink, NavBarComponent],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {
destinations: Destination[] = [
    {
      id: 1,
      name: 'Santorini',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=250&fit=crop',
      description: 'Beautiful Greek island with stunning sunsets'
    },
    {
      id: 2,
      name: 'Dubrovnik',
      image: 'https://images.unsplash.com/photo-1555990538-c673d044efbd?w=400&h=250&fit=crop',
      description: 'Historic Croatian coastal city'
    },
    {
      id: 3,
      name: 'Cappadocia',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      description: 'Magical hot air balloon experiences'
    },
    {
      id: 4,
      name: 'Cinque Terre',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbfded4b6e?w=400&h=250&fit=crop',
      description: 'Colorful Italian coastal villages'
    }
  ];

  stories: Story[] = [
    {
      id: 1,
      title: 'Best Adventure Spots in Greece: 10 Destinations You Must Visit',
      excerpt: 'Discover the most thrilling adventures Greece has to offer, from ancient ruins to crystal-clear waters.',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=300&h=200&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Exploring Local Cuisines: A Food Lover\'s Guide to European Delicacies',
      excerpt: 'Journey through Europe\'s diverse culinary landscape and discover hidden gastronomic gems.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop',
      readTime: '6 min read'
    },
    {
      id: 3,
      title: 'Photography Tips for Capturing Stunning Travel Moments',
      excerpt: 'Learn professional techniques to make your travel photos stand out from the crowd.',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop',
      readTime: '5 min read'
    }
  ];

  highlights: Highlight[] = [
    {
      id: 1,
      title: 'World\'s top places to visit in 2024',
      description: 'An unforgettable journey through history and culture awaits you in these remarkable destinations.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop',
      author: 'Maria Rodriguez',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      title: 'Hidden gems in Southeast Asia',
      description: 'Explore lesser-known destinations that offer authentic cultural experiences and breathtaking landscapes.',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=250&fit=crop',
      author: 'John Smith',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  constructor() { }

  onSubscribe(email: string) {
    console.log('Subscription email:', email);
    // Implement subscription logic here
  }
}
