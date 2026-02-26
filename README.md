# Weather App
A weather app powered by [Open-Meteo](https://open-meteo.com/) and built using ***React***, ***Typescript*** and ***TailwindCSS***

## Features
* Current, Daily (Next 7 days), Hourly (Next 7 days)'s weather prediction
* Change of units 
* Display prediction's time at current or target's timezone
* Locations are bookmarkable
* Automatic geoencoding of user's current location to get the corresponding weather prediction

## Get Started
Visit the implementation here: https://weather-app-2ihi.onrender.com

<div align='center'>
    <img src='/demo/desktop-dark.jpg' width='71%'/>
    <img src='/demo/mobile-dark.jpg' width='18%' />
</div>

<div align='center'>
    <img src='/demo/desktop-light.jpg' width='71%'/>
    <img src='/demo/mobile-light.jpg' width='18%' />
</div>

## Key takeaways
1. How to use `useActionState()` in ***Typescript***
    
    * `ErrorType` is a union of 3 type so that it can cover all the possible returned value
    * `instanceof` is useful for type narrowing of the caught error.
    
    ```typescript

    type ErrorType = null | string | Error

    const [submitError, searchAction, isPending] = useActionState<ErrorType, FormData>(
        async (_prevSubmitError: ErrorType, formData: FormData): Promise<ErrorType> => {
            const locationVal = formData.get('location')

            try {
                setSearchVal('')
                setSearchSuggestions([])
                // Fetch location
                const locationResults = await fetchLocationData(locationVal)

                // Extract and set location state
                // Once location state is changed, it triggers useEffect in App.tsx to fetch weather data
                const { id, latitude, longitude, name, country, timezone } = locationResults[0]
                const locationState = { id, name: `${name}, ${country}`, timezone, latitude, longitude }
                saveLocation(locationState)
                setLocation(locationState)

                return null
            }
            catch (error) {
                if (error instanceof Error) {
                    return error
                }
                return 'An unknown error is caught.'
            }
        },
        null
    )
    ``` 


2. Wrapper to make a function awaitable
    *  For context, this is needed in this project as the HTML's geoencoding API uses promises instead of ES6's await/async syntax. Refer to this: https://www.w3schools.com/html/html5_geolocation.asp.
    * For a snippet:
    ```javascript
    const x = document.getElementById("demo");

    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    }

    function success(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    }

    function error() {
    alert("Sorry, no position available.");
    }
    ```

    * Therefore, a Promise wrapper is needed as following, which makes it awaitable in an async function.
    * If error occurs here, `reject` will also pass the error to the `catch` block.

    ```typescript
    export function getCurrentPosition(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }
    ```

3. How is a `Date` Obj resolves in browser and in node.js
    * In Browser, `Date` always resolve to this following format: Thu Feb 26 2026 18:45:00 GMT+0800 (Malaysia Time)
        - which indicates that it always convert any timestamp to the time at the current timezone of the device. (i.e. GMT+8 in Malaysia)
    * In Node.js, `Date` resolve to this following format: 2026-02-26T10:54:57.333Z
        - which indicates that it always convert any timestamp to the time at the GMT+0.

4. Use of z-index
    * For z-index to take effect, it must be applied to elements that are sibling to each other.

5. Tailwindcss may sometimes not recognize certain syntax in css files. 
    * Therefore, refer to this solution: https://stackoverflow.com/questions/79513015/tailwind-css-v4-unknown-at-rule-plugin-custom-variant-theme-utility-v
    * Find the json files under the tailwind intellisense plugin's settings.

6. Darkmode setup with tailwindCSS
    * Refer to: https://tailwindcss.com/docs/dark-mode
    * For a snippet:
        ```css
        @import "tailwindcss";
        @custom-variant dark (&:where(.dark, .dark *));
        ```

        ```html
        <html class="dark">
            <body>
                <div class="bg-white dark:bg-black">
                <!-- ... -->
                </div>
            </body>
        </html>
        ```
    * Setting up this way, by toggle on/off the `'dark'` class at html, the div will show either `bg-white` or `dark:bg-black`
    * For further easing the adjustment, this can be done in css (assuming that all the colors scheme are set using CSS variables):
        ```css
        .dark{
            --text-main: white;
            --bg-main: var(--color-slate-900);
            --bg-layer-1: #25253e;
            --bg-layer-2: #3c3a5c; /* Hovering */
            --bg-layer-3: #2f2f48; /* Hourly forecast child */
            --bg-layer-4: #3c3b5c; /* Hourly Menu */
            --btn-color: #4058d2;
        }
        ```
7. To make an element scrollable, it must have a maximum height set to it.
