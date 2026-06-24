using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.DualShock;
using UnityEngine.InputSystem.XInput;

public static class ControllerButtons 
{
   public static Sprite GetSouthButton(Gamepad gamepad)
    {
        // playstation 4 or 5
        if (gamepad is DualShock4GamepadHID|| gamepad is DualSenseGamepadHID) return Resources.Load<Sprite>("UIAssets/CrossIcon");
        // Xbox
        else if (gamepad is XInputController) return Resources.Load<Sprite>("UIAssets/AIcon");
        // nintendo
        else return Resources.Load<Sprite>("UIAssets/BIcon");

    }

    public static Sprite GetNorthButton(Gamepad gamepad)
    {
        // playstation 4 or 5
        if (gamepad is DualShock4GamepadHID || gamepad is DualSenseGamepadHID) return Resources.Load<Sprite>("UIAssets/TriangleIcon");
        // Xbox
        else if (gamepad is XInputController) return Resources.Load<Sprite>("UIAssets/YIcon");
        // nintendo
        else return Resources.Load<Sprite>("UIAssets/XIcon");

    }

    public static Sprite GetEastButton(Gamepad gamepad)
    {
        // playstation 4 or 5
        if (gamepad is DualShock4GamepadHID || gamepad is DualSenseGamepadHID) return Resources.Load<Sprite>("UIAssets/CircleIcon");
        // Xbox
        else if (gamepad is XInputController) return Resources.Load<Sprite>("UIAssets/BIcon");
        // nintendo
        else return Resources.Load<Sprite>("UIAssets/AIcon");

    }

    public static Sprite GetWestButton(Gamepad gamepad)
    {
        // playstation 4 or 5
        if (gamepad is DualShock4GamepadHID || gamepad is DualSenseGamepadHID) return Resources.Load<Sprite>("UIAssets/SquareIcon");
        // Xbox
        else if (gamepad is XInputController) return Resources.Load<Sprite>("UIAssets/XIcon");
        // nintendo
        else return Resources.Load<Sprite>("UIAssets/YIcon");

    }

   
}
