import React, { memo } from "react";
import ReactTooltip from "react-tooltip";
import "../../styles/ui-components/_coin.scss";
import { getRandomColor, getShortText, JustifyContent } from "../../common";
import { FlexBox } from "./FlexBox";

export interface CoinBaseProps {
  email: string | null;
  name: string | null;
  url?: string | null;
  showTooltip?: boolean;
  className?: string;
}
const CoinBase: React.FunctionComponent<CoinBaseProps> = ({
  email,
  name,
  url,
  showTooltip,
  className,
}) => {
  return (
    <div data-tip={name ?? email}>
      <FlexBox
        justifyContent={JustifyContent.center}
        className={`coin ${className}`}
      >
        {url ? (
          <img
            src={url}
            alt={`Photo of ${name ?? email}`}
            width={25}
            height={25}
          />
        ) : (
          <span style={{ backgroundColor: getRandomColor() }}>
            {getShortText(name ?? email!, 2, false)}
          </span>
        )}
      </FlexBox>
      {showTooltip && (
        <ReactTooltip
          place="top"
          type="dark"
          effect="solid"
          className="coin__tooltip"
        />
      )}
    </div>
  );
};

export const Coin = memo(CoinBase);
