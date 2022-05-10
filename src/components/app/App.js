import { BrowserRouter, Routes, Route } from "react-router-dom";

import {    
	Layout,
    BonusActionsPage,
    CombosPage,
    DessertPage,
    DrinksPage,
    HomePage,
    NotFoundPage,
    PizzaPage,
    SnacksPage,
	BasketPage
} from "../../pages";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage/>} />
					<Route path="pizza" element={<PizzaPage head />} />
					<Route path="combos" element={<CombosPage head />} />
					<Route path="snacks" element={<SnacksPage head />} />
					<Route path="drinks" element={<DrinksPage head />} />
					<Route path="dessert" element={<DessertPage head />} />
					<Route path="bonusactions" element={<BonusActionsPage/>} />
					<Route path="basket" element={<BasketPage />} />
					<Route path="*" element={<NotFoundPage/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
