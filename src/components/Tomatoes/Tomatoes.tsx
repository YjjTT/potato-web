import * as React from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import { connect } from 'react-redux';

class Tomatoes extends React.Component {
  public render (){
    return(
      <div className="Tomatoes" id="tomatoes">
        <TomatoAction />
      </div>
    )
  }
}
const mapStateToProps = (state:any, ownProps:any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);