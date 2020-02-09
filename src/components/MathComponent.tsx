import * as React from 'react';
// import { convert }  from '../utils';
import { SourceSpecification, convertPromise } from '../utils/convert';
import { XOR } from 'ts-xor';

interface TeXProps {
  tex: string
};

interface MathMLProps {
  mathml: string
};

// source props can be only one of mathml or tex props
type SourceProps = XOR<MathMLProps, TeXProps>;

// TODO import config props from mathjax-full
const defaultProps = {
  display: true
};

type DefaultProps = typeof defaultProps;

type State = {
  renderPromise: null | Promise<void>,
  renderResult: string
  renderSrc: SourceSpecification,
  src: SourceSpecification
};

export type MathComponentProps = SourceProps & Partial<DefaultProps>;

export class MathComponent extends React.Component<MathComponentProps, State> {
  static defaultProps: DefaultProps = defaultProps;
  private rootRef = React.createRef<HTMLDivElement>();
  state: State = {
    renderSrc: { src: "", lang: "TeX" },
    renderPromise: null,
    renderResult: "",
    src: {
      src: "",
      lang: "TeX"
    }
  };
  static parseProps(props: MathComponentProps): SourceSpecification {
    // if the prop is present, then it is the ONLY source specified
    // due to XOR type def
    if ("mathml" in props){
      return {
        src: props.mathml!, // ! required for typescript
        lang: 'MathML'
      };
    } else if ("tex" in props) {
      return {
        src: props.tex!, // ! required for typescript 
        lang: 'TeX'
      };
    }
    // UNREACHABLE
    return { src: '', lang: 'TeX' };
  }
  static getDerivedStateFromProps(props: MathComponentProps, state: State): State {
    const src = MathComponent.parseProps(props);
    return { ...state, src };
  }
  componentDidMount() {
    this._sendRender();
  }
  componentDidUpdate() {
    this._sendRender();
  }
  _sendRender() {
    const node = this.rootRef.current;
    const { src, renderSrc } = this.state;
    if (node && !(src.src == renderSrc.src && src.lang == renderSrc.lang)) {
      const prom = convertPromise(
        src,
        node,
        this.props.display!)
        .then(htmlStr => {
          // check if promise is correct (ie. most recent)
          if (prom == this.state.renderPromise) {
            this.setState({ renderResult: htmlStr });
          } else {
            console.log('promise expired...');
          }
        });
      this.setState({ renderPromise: prom, renderSrc: src });
    }
  }
  render() {
    let renderedSVG = this.state.renderResult;
    /*
    let node = this.rootRef.current;
    let src = this.parseProps();
    if (node) {
      renderedSVG = convert(src, node, this.props.display!);
    } else {
      console.log('Didn\'t work!', this.rootRef);
    }
    */
    return (
      <div ref={this.rootRef} style={{display: this.props.display!? 'block':'inline-block'}}>
        <div dangerouslySetInnerHTML={{__html: renderedSVG}}/>
      </div>
    )
  }
}
