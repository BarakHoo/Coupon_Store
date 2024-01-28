import "./CouponFilter.css";
import CustomerCouponsByCategory from "../CustomerCouponsByCategory/CustomerCouponsByCategory";

function CouponFilter(): JSX.Element {
    return (
        <div className="CouponFilter">
			<CustomerCouponsByCategory/>
        </div>
    );
}

export default CouponFilter;
