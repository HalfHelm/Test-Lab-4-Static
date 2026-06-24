using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

public class MenuControler : MonoBehaviour
{
    // all ui variables
    private UIDocument _doc;
    private Button _newGameButton;
    private Button _loadGameButton;
    private Button _creditsButton;
    private Button _exitButton;
    private VisualElement _MainMenuButtons;
    private VisualElement _ConfirmButton;

    private void Awake()
    {
        // get all ui elements
        _doc = GetComponent<UIDocument>();
        _newGameButton = _doc.rootVisualElement.Q<Button>("NewGameButton");
        _loadGameButton = _doc.rootVisualElement.Q<Button>("LoadGameButton");
        _creditsButton = _doc.rootVisualElement.Q<Button>("CreditsButton");
        _exitButton = _doc.rootVisualElement.Q<Button>("ExitButton");

        _MainMenuButtons = _doc.rootVisualElement.Q<VisualElement>("Buttons");
        _ConfirmButton = _doc.rootVisualElement.Q<VisualElement>("ConfirmButton");

        // add click events
        _newGameButton.clicked += NewGameButtonClicked;
        _loadGameButton.clicked += LoadGameButtonClicked;
        _creditsButton.clicked += CreditsButtonClicked;
        _exitButton.clicked += ExitButtonClicked;

    }

    private void Start()
    {
        // animations
        Invoke("StartButtonAnimtion", 1f);
        // focus with controler inputs 
        FocusFirstElement();

        // set confirm button for controller
        if (Gamepad.current != null)
        {
            _ConfirmButton.style.backgroundImage = new StyleBackground(ControllerButtons.GetSouthButton(Gamepad.current));
        }
        else
        {
            _doc.rootVisualElement.Q<VisualElement>("ConfirmInfoContainer").style.display = DisplayStyle.None;
        }
       

    }

    // focus with controller inputs 
    public void FocusFirstElement()
    {
        GetComponent<UIDocument>().rootVisualElement.
            Q<VisualElement>("NewGameButton").Focus();
    }

    private void Update()
    {
        // check animations
        //Debug.Log(_MainMenuButtons.ClassListContains("ButtonContainerStart"));
    }

    private void StartButtonAnimtion()
    {
        _MainMenuButtons.RemoveFromClassList("ButtonContainerStart");
    }

    // click events
    private void NewGameButtonClicked()
    {
        // load the game start scene
        //UnityEngine.SceneManagement.SceneManager.LoadScene("StartSzene");
        UnityEngine.SceneManagement.SceneManager.LoadScene("Combat");
        //Debug.Log("New Game Button Clicked");
    }

    private void LoadGameButtonClicked()
    {
        // load saved game scene
        UnityEngine.SceneManagement.SceneManager.LoadScene("Combat");
        Debug.Log("Load Game Button Clicked");
    }

    private void CreditsButtonClicked() 
    {
        // load credits scene
        UnityEngine.SceneManagement.SceneManager.LoadScene("Credit");
    }

    private void ExitButtonClicked()
    {
        Application.Quit();
    }

    // Hilfe durch: https://www.youtube.com/watch?v=8w0qvO4Vumc und Copilot :D
}
