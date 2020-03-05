import React from "react";
import { connect } from "react-redux";
import { setSearchFilter } from "../../actions/filters";
import { Placeholders } from "../../common";
import "../../styles/components/header/_search.scss";
import { Dispatch } from "redux";
import { SearchFilterAction } from "../../store/store.types";

interface SearchProps {
  wrapperClass?: string;
}

interface DispatchProps {
  setSearchFilter: (value: string) => void;
}

type Props = SearchProps & DispatchProps;

class Search extends React.PureComponent<Props> {
  render() {
    return (
      <div className={this.props.wrapperClass}>
        <input
          className="search"
          placeholder={Placeholders.search}
          onInput={evt =>
            this.props.setSearchFilter((evt.target as HTMLInputElement).value)
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<SearchFilterAction>
): DispatchProps => {
  return {
    setSearchFilter: (value: string) => dispatch(setSearchFilter(value))
  };
};

export default connect<{}, DispatchProps, SearchProps>(
  undefined,
  mapDispatchToProps
)(Search);
