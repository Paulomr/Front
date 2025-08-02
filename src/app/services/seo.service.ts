// 📁 src/app/services/seo.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://crunchy-munch.com';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) { }

  updateSeoData(data: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: string;
    url?: string;
  }) {
    const currentUrl = data.url || `${this.baseUrl}${this.router.url}`;
    
    // 🏷️ Title
    if (data.title) {
      const fullTitle = `${data.title} | Crunchy Munch`;
      this.title.setTitle(fullTitle);
      this.meta.updateTag({ property: 'og:title', content: fullTitle });
      this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    }

    // 📝 Description
    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
      this.meta.updateTag({ property: 'og:description', content: data.description });
      this.meta.updateTag({ name: 'twitter:description', content: data.description });
    }

    // 🔍 Keywords
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    // 🖼️ Image
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
      this.meta.updateTag({ property: 'og:image:width', content: '1200' });
      this.meta.updateTag({ property: 'og:image:height', content: '630' });
    }

    // 🔗 URL y canonical
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ rel: 'canonical', href: currentUrl });

    // 📱 Social Media
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Crunchy Munch' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    // 🏢 Structured Data
    this.updateStructuredData(data);
  }

  private updateStructuredData(data: any) {
    // Remover structured data anterior
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Crear nuevo structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Crunchy Munch",
      "url": "https://crunchy-munch.com",
      "logo": "https://crunchy-munch.com/assets/logo.png",
      "description": data.description || "Las mejores cookies, crookies y milkshakes artesanales",
      "servesCuisine": ["Cookies", "Desserts", "Milkshakes"],
      "priceRange": "$$"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  setDefaultSeo() {
    this.updateSeoData({
      title: 'Inicio',
      description: 'Crunchy Munch - Las mejores cookies, crookies y milkshakes artesanales. Ingredientes frescos, sabores únicos y la mejor experiencia dulce.',
      keywords: 'cookies artesanales, crookies, milkshakes, postres, dulces, crunchy munch, chocolate, nutella',
      image: 'https://crunchy-munch.com/assets/og-home.jpg'
    });
  }

  setProductPageSeo(productType: string) {
    // ✅ Tipado explícito para resolver el error TS7053
    const seoData: { [key: string]: { title: string; description: string; keywords: string } } = {
      'Cookie': {
        title: 'Nuestras Cookies ',
        description: 'Deliciosas cookies artesanales con ingredientes premium. Chocolate chip, double chocolate, y más sabores únicos.',
        keywords: 'cookies artesanales, chocolate chip, cookies caseras, postres'
      },
      'Crookie': {
        title: 'Nuestras Crookies',
        description: 'Nuestras famosas crookies - la perfecta combinación entre croissant y cookie. Con Nutella, chocolate y más.',
        keywords: 'crookie, croissant cookie, nutella, chocolate, híbrido dulce'
      },
      'Milkshake': {
        title: 'Nuestras milkshakes',
        description: 'Milkshakes cremosos y deliciosos. Oreo, chocolate, vainilla y sabores de temporada.',
        keywords: 'milkshakes, batidos, oreo, chocolate, cremoso, bebidas'
      },
      'Bebidas': {
        title: 'Nuestras Bebidas',
        description: 'Amplia variedad de bebidas para acompañar tus postres favoritos.',
        keywords: 'bebidas, refrescos, jugos, acompañamientos'
      }
    };

    // ✅ Acceso seguro con fallback
    const data = seoData[productType] || seoData['Cookie'];
    this.updateSeoData({
      ...data,
      image: `https://crunchy-munch.com/assets/og-${productType.toLowerCase()}.jpg`
    });
  }

  setAboutPageSeo() {
    this.updateSeoData({
      title: 'Quién Somos',
      description: 'Conoce la historia de Crunchy Munch. Nuestra pasión por crear los mejores postres artesanales y la experiencia que nos respalda.',
      keywords: 'crunchy munch historia, quienes somos, postres artesanales, empresa',
      image: 'https://crunchy-munch.com/assets/og-about.jpg'
    });
  }
}