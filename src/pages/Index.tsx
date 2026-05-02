import { useState } from "react";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import AccountPage from "@/pages/AccountPage";
import DeliveryPage from "@/pages/DeliveryPage";
import ContactsPage from "@/pages/ContactsPage";

type Page = "home" | "catalog" | "product" | "cart" | "account" | "delivery" | "contacts";

const Index = () => {
  const [page, setPage] = useState<Page>("home");
  const [params, setParams] = useState<Record<string, string>>({});

  const navigate = (p: string, newParams?: Record<string, string>) => {
    setPage(p as Page);
    setParams(newParams || {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "catalog":
        return <CatalogPage onNavigate={navigate} initialSeries={params.series} />;
      case "product":
        return <ProductPage slug={params.slug || ""} onNavigate={navigate} />;
      case "cart":
        return <CartPage onNavigate={navigate} />;
      case "account":
        return <AccountPage onNavigate={navigate} />;
      case "delivery":
        return <DeliveryPage onNavigate={navigate} />;
      case "contacts":
        return <ContactsPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <Layout page={page} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
};

export default Index;
