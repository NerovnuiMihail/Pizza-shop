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
    SnacksPage
} from "../../pages";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage/>} />
					<Route path="pizza" element={<PizzaPage/>} />
					<Route path="combos" element={<CombosPage/>} />
					<Route path="snacks" element={<SnacksPage/>} />
					<Route path="drinks" element={<DrinksPage/>} />
					<Route path="dessert" element={<DessertPage/>} />
					<Route path="bonusactions" element={<BonusActionsPage/>} />
					<Route path="*" element={<NotFoundPage/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
