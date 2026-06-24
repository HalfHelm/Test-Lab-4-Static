using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

public class PauseMenuController : MonoBehaviour
{
    // all ui variables
    private UIDocument _pausedoc;
    private VisualElement _QuitGameContainer;
    private VisualElement _SaveGameContainer;
    private Button _Continue;
    private Button _SaveGame;
    private Button _QuitGame;

    private Button _YesSave;
    private Button _NoSave;
    private Button _YesQuit;
    private Button _NoQuit;


    private void Awake()
    {
        // get all ui elements
        _pausedoc = GetComponent<UIDocument>();
        _QuitGameContainer = _pausedoc.rootVisualElement.Q<VisualElement>("quitGame");
        _SaveGameContainer = _pausedoc.rootVisualElement.Q<VisualElement>("saveGame");
        _Continue = _pausedoc.rootVisualElement.Q<Button>("ContinueButton");
        _SaveGame = _pausedoc.rootVisualElement.Q<Button>("SaveGameButton");
        _QuitGame = _pausedoc.rootVisualElement.Q<Button>("QuitButton");

        _YesSave = _pausedoc.rootVisualElement.Q<Button>("YesSave");
        _NoSave = _pausedoc.rootVisualElement.Q<Button>("NoSave");
        _YesQuit = _pausedoc.rootVisualElement.Q<Button>("YesQuit");
        _NoQuit = _pausedoc.rootVisualElement.Q<Button>("NoQuit");

        // add click events
        _Continue.clicked += ContinueButtonClicked;
        _SaveGame.clicked += SaveGameButtonClicked;
        _QuitGame.clicked += QuitGameButtonClicked;

        _YesSave.clicked += SaveGameButtonClicked;
        _NoSave.clicked += SaveGameButtonClicked;
        _YesQuit.clicked += QuitGameButtonClicked;
        _NoQuit.clicked += QuitGameButtonClicked;
    }

    private void Start()
    {
        // focus with controler inputs 
        //FocusFirstElement();


    }

    // focus with controller inputs 
    public void FocusFirstElement()
    {
        GetComponent<UIDocument>().rootVisualElement.
            Q<VisualElement>("ContinueButton").Focus();
    }


    // click events
    private void ContinueButtonClicked()
    {
        Debug.Log("Continue");
        // pause doc set active false
        _pausedoc.enabled = false;
        
    }

    private void SaveGameButtonClicked()
    {
        // animations
        _SaveGameContainer.RemoveFromClassList("ButtonContainerStart");
    }

    private void YesSaveButtonClicked()
    {
        // save game
        Debug.Log("SaveGame");
    }

    private void NoSaveButtonClicked()
    {
        // animations
        //_SaveGameContainer.AddToClassList("ButtonContainerStart");
    }

    private void QuitGameButtonClicked()
    {
        Debug.Log("QuitGame");
        // animations
        _QuitGameContainer.RemoveFromClassList("ButtonContainerStart");
    }

    private void YesQuitButtonClicked()
    {
        // quit game
        Application.Quit();
    }

    private void NoQuitButtonClicked()
    {
        //gehtnicht?
        // animations
        //_QuitGameContainer.AddToClassList("ButtonContainerStart");
    }
}
