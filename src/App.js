import "./App.css";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function App() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      word: "",
      players: "",
    },
  });

  const [players, setPlayers] = useState(0);
  const [wordArray, setWordArray] = useState([]);
  const [counter, setCounter] = useState(1);
  const [showWord, setShowWord] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const onSubmit = (data) => {
    const players = data.players;
    const filledArray = Array(players).fill(data.word);
    const random = Math.floor(Math.random() * players);
    filledArray[random] = "Conspirator";
    setWordArray(filledArray);
    setPlayers(players);
    console.log(filledArray);
    reset();
  };

  const nextPlayerHandler = () => {
    if (counter < players) {
      setCounter(counter + 1);
      setShowWord(false);
    } else {
      setShowOptions(true);
    }
  };

  const showAgainHandler = () => {
    setCounter(1);
    setShowWord(false);
    setShowOptions(false);
  };

  const resetHandler = () => {
    setPlayers(0);
    setWordArray([]);
    setCounter(1);
    setShowWord(false);
    setShowOptions(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!players && (
          <>
            <div className="display-3 text-center" style={{ color: "white" }}>
              Detective Club
            </div>
            <div
              className="text-center mb-5"
              style={{ color: "white", fontSize: "20px" }}
            >
              ( Rules:{" "}
              <a
                href="https://cdn.1j1ju.com/medias/92/14/39-detective-club-rulebook.pdf"
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "white", fontSize: "20px" }}
              >
                ENG
              </a>{" "}
              <a
                href="https://tesera.ru/images/items/1486806/Rules-detective-club-rus.pdf"
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "white", fontSize: "20px" }}
              >
                RU
              </a>{" "}
              )
            </div>
            <Form
              noValidate
              className="d-grid gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                control={control}
                name="word"
                rules={{ required: true }}
                render={({ field }) => (
                  <FloatingLabel controlId="floatingInput" label="Word">
                    <Form.Control
                      {...field}
                      size="lg"
                      type="text"
                      placeholder="word"
                      isInvalid={errors.word}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a word
                    </Form.Control.Feedback>
                  </FloatingLabel>
                )}
              />

              <Controller
                control={control}
                name="players"
                rules={{ required: true, min: 3 }}
                render={({ field }) => (
                  <FloatingLabel controlId="floatingInput" label="Players">
                    <Form.Control
                      {...field}
                      size="lg"
                      type="number"
                      placeholder="players"
                      isInvalid={errors.players}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.players?.type === "min"
                        ? "Minimum number of players is 3"
                        : "Please choose the number of players"}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                )}
              />

              <div className="d-grid">
                <Button size="lg" variant="info" type="submit">
                  Start
                </Button>
              </div>
            </Form>
          </>
        )}
        {!showOptions && wordArray.length > 0 && (
          <div className="d-grid gap-4">
            <div className="display-3 text-center" style={{ color: "gray" }}>
              Ready Player {counter}
            </div>

            {showWord ? (
              <>
                <div
                  className="display-4 text-center mb-4"
                  style={{ color: "white" }}
                >
                  {wordArray[counter - 1]}
                </div>
                <Button size="lg" variant="info" onClick={nextPlayerHandler}>
                  OK
                </Button>
              </>
            ) : (
              <>
                <div
                  className="display-4 text-center mb-4"
                  style={{ color: "white" }}
                >
                  ???
                </div>
                <Button
                  size="lg"
                  variant="info"
                  onClick={() => setShowWord(true)}
                >
                  Show Word
                </Button>
              </>
            )}
          </div>
        )}
        {showOptions && (
          <div className="d-grid gap-4">
            <Button size="lg" variant="info" onClick={showAgainHandler}>
              Show Again
            </Button>
            <Button size="lg" variant="info" onClick={resetHandler}>
              Reset
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
