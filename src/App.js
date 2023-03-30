import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Page from './Page';

const App = () => {
  const savedPalettes = JSON.parse(
    window.localStorage.getItem('palettes')
  );
  const [palettes, setPalettes] = useState(
    savedPalettes || seedColors
  );

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (id) => {
    setPalettes(
      palettes.filter((p) => {
        return p.id !== id;
      })
    );
  };

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    syncLocalStorage();
  }, [palettes]);

  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames='page'
        timeout={500}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route
              path='/palette/new'
              element={
                <Page>
                  <NewPaletteForm
                    palettes={palettes}
                    savePalette={savePalette}
                  />
                </Page>
              }
            />
            <Route
              index
              path='/'
              element={
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </Page>
              }
            />
            <Route
              path='/palette/:id'
              element={
                <Page>
                  <Palette palettes={palettes} />
                </Page>
              }
            />
            <Route
              path='/palette/:paletteId/:colorId'
              element={
                <Page>
                  <SingleColorPalette palettes={palettes} />
                </Page>
              }
            />
            <Route
              path='*'
              element={
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </Page>
              }
            />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
