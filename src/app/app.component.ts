// 📁 src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

// 📦 Componentes
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';

// 🎯 Servicio SEO
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent,
    ReactiveFormsModule,
    CartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Crunchy Munch - Deliciosas Cookies y Milkshakes';

  constructor(
    private router: Router,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    console.log('🚀 Inicializando Crunchy Munch App...');
    
    // 🎯 SEO por defecto al cargar la app
    this.seoService.setDefaultSeo();

    // 📍 Escuchar cambios de ruta para actualizar SEO
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log(`🔄 Navegando a: ${event.url}`);
        
        // Scroll to top en cada cambio de página
        window.scrollTo(0, 0);
        
        // Actualizar SEO según la ruta actual
        this.updateSeoBasedOnRoute(event.url);
      });
  }

  private updateSeoBasedOnRoute(url: string) {
    // Limpiar query parameters y normalizar
    const route = url.split('?')[0].toLowerCase().trim();
    
    console.log(`🎯 Actualizando SEO para ruta: ${route}`);

    // 🗺️ Mapeo de rutas a SEO específico
    switch (route) {
      case '/':
      case '/home':
        this.seoService.setDefaultSeo();
        break;

      case '/quien%20somos':
      case '/quien-somos':
        this.seoService.setAboutPageSeo();
        break;

      case '/cookie':
        this.seoService.setProductPageSeo('Cookie');
        break;

      case '/crookie':
        this.seoService.setProductPageSeo('Crookie');
        break;

      case '/milkshake':
        this.seoService.setProductPageSeo('Milkshake');
        break;

      case '/bebidas':
        this.seoService.setProductPageSeo('Bebidas');
        break;

      case '/nuestros%20productos':
      case '/nuestros-productos':
        this.seoService.updateSeoData({
          title: 'Nuestros Productos',
          description: 'Descubre toda nuestra gama de productos artesanales: cookies crujientes, crookies únicos, milkshakes cremosos y bebidas refrescantes. Calidad premium en cada bocado.',
          keywords: 'productos crunchy munch, menu completo, cookies artesanales, crookies, milkshakes premium, bebidas',
          image: 'https://crunchy-munch.com/assets/og-productos.jpg'
        });
        break;

      case '/pqrs':
        this.seoService.updateSeoData({
          title: 'PQRS - Contacto',
          description: 'Contáctanos para peticiones, quejas, reclamos o sugerencias. En Crunchy Munch valoramos tu opinión y estamos aquí para ayudarte.',
          keywords: 'contacto crunchy munch, pqrs, servicio al cliente, quejas, sugerencias',
          image: 'https://crunchy-munch.com/assets/og-contact.jpg'
        });
        break;

      case '/tus%20pedidos':
      case '/tus-pedidos':
        this.seoService.updateSeoData({
          title: 'Tus Pedidos',
          description: 'Revisa el estado de tus pedidos en Crunchy Munch. Seguimiento en tiempo real de tus cookies y milkshakes favoritos.',
          keywords: 'pedidos crunchy munch, seguimiento pedidos, estado pedido',
          image: 'https://crunchy-munch.com/assets/og-pedidos.jpg'
        });
        break;

      case '/resumen%20de%20compra':
      case '/resumen-de-compra':
        this.seoService.updateSeoData({
          title: 'Resumen de Compra',
          description: 'Finaliza tu pedido en Crunchy Munch. Revisa tus productos seleccionados y procede con el pago seguro.',
          keywords: 'checkout crunchy munch, resumen compra, finalizar pedido',
          image: 'https://crunchy-munch.com/assets/og-checkout.jpg'
        });
        break;

      case '/tyc':
        this.seoService.updateSeoData({
          title: 'Términos y Condiciones',
          description: 'Términos y condiciones de uso de Crunchy Munch. Conoce nuestras políticas de servicio, privacidad y compras.',
          keywords: 'términos condiciones, políticas crunchy munch, privacidad',
          image: 'https://crunchy-munch.com/assets/og-terms.jpg'
        });
        break;

      case '/login':
        this.seoService.updateSeoData({
          title: 'Iniciar Sesión',
          description: 'Inicia sesión en tu cuenta de Crunchy Munch para acceder a tu historial de pedidos y ofertas exclusivas.',
          keywords: 'login crunchy munch, iniciar sesión, cuenta usuario',
          image: 'https://crunchy-munch.com/assets/og-login.jpg'
        });
        break;

      case '/registro':
        this.seoService.updateSeoData({
          title: 'Crear Cuenta',
          description: 'Regístrate en Crunchy Munch y disfruta de beneficios exclusivos, seguimiento de pedidos y ofertas especiales.',
          keywords: 'registro crunchy munch, crear cuenta, beneficios usuario',
          image: 'https://crunchy-munch.com/assets/og-register.jpg'
        });
        break;

      default:
        // 🔍 Para rutas dinámicas o no definidas
        if (route.includes('/producto/')) {
          const productSlug = route.split('/producto/')[1];
          this.setDynamicProductSeo(productSlug);
        } else if (route.includes('/categoria/')) {
          const categorySlug = route.split('/categoria/')[1];
          this.setDynamicCategorySeo(categorySlug);
        } else {
          // SEO genérico para rutas no definidas
          console.log(`⚠️ Ruta no reconocida: ${route} - Usando SEO por defecto`);
          this.seoService.setDefaultSeo();
        }
    }
  }

  private setDynamicProductSeo(productSlug: string) {
    // 🍪 SEO dinámico para productos específicos
    const productName = productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    this.seoService.updateSeoData({
      title: `${productName} | Producto Especial`,
      description: `Descubre nuestro delicioso ${productName}. Hecho con ingredientes premium y la calidad artesanal que caracteriza a Crunchy Munch.`,
      keywords: `${productSlug}, ${productName}, producto especial, crunchy munch, artesanal`,
      image: `https://crunchy-munch.com/assets/products/${productSlug}.jpg`,
      type: 'product'
    });
  }

  private setDynamicCategorySeo(categorySlug: string) {
    // 📂 SEO dinámico para categorías
    const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    this.seoService.updateSeoData({
      title: `${categoryName} | Categoría`,
      description: `Explora nuestra selección de ${categoryName.toLowerCase()}. Productos artesanales de la más alta calidad en Crunchy Munch.`,
      keywords: `${categorySlug}, ${categoryName}, categoría, productos crunchy munch`,
      image: `https://crunchy-munch.com/assets/categories/${categorySlug}.jpg`
    });
  }
}