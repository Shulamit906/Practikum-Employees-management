import { Link } from "react-router-dom"

const Header = () => {

    return <div className="header">
        <div className="App-header">

            <div className='my-img'></div>
        </div>
        <div className="App-header">
            <Link to="/addRole">addRole</Link>
            <div>|</div>
            <Link to="/addEmployee">addEmployee</Link>
            <div>|</div>
            <Link to="/displayEmployees">displayEmployees</Link>
            <div>|</div>
            <Link to="/homePage">homePage</Link>
        </div>

    </div>
}
export default Header

