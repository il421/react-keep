import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { setSearchFilter } from "../../actions/filters";
import { Placeholders } from "../../common/placeholders";
import "../../styles/components/header/_search.scss";

interface SearchProps {
  setSearchFilter: (value: string) => void;
  wrapperClass?: string;
}

class Search extends React.PureComponent<SearchProps> {
  render() {
    return (
      <div className={ this.props.wrapperClass }>
        <input
          className="search"
          placeholder={ Placeholders.search }
          onInput={ (evt) => this.props.setSearchFilter((evt.target as HTMLInputElement).value) }
        />
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setSearchFilter: (value: string) => dispatch(setSearchFilter(value))
  };
};

export default connect(undefined, mapDispatchToProps)(Search);
