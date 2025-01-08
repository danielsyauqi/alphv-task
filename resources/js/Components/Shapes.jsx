export const Triangle = ({ color }) => (
    <div className="w-16 h-16 relative">
        <div
            style={{ borderBottomColor: color }}
            className="w-0 h-0 border-l-[32px] border-l-transparent border-b-[48px] border-r-[32px] border-r-transparent"
        />
    </div>
);

export const Circle = ({ color }) => (
    <div 
        style={{ backgroundColor: color }}
        className="w-16 h-16 rounded-full"
    />
);

export const Square = ({ color }) => (
    <div 
        style={{ backgroundColor: color }}
        className="w-16 h-16"
    />
);