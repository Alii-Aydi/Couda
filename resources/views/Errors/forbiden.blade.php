<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 Interdit</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Nunito', sans-serif;
            background-color: #1a202c;
            color: #cbd5e0;
        }

        .x-logo {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            position: relative;
            background-color: #fc8181;
            border-radius: 50%;
            animation: rotateX 0.5s forwards;
        }

        .x-logo::before,
        .x-logo::after {
            content: '';
            position: absolute;
            width: 60px;
            height: 10px;
            background-color: white;
            border-radius: 5px;
        }

        .x-logo::before {
            transform: rotate(45deg);
        }

        .x-logo::after {
            transform: rotate(-45deg);
        }

        @keyframes rotateX {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body class="flex items-center justify-center h-screen">

    <div class="bg-gray-800 p-8 rounded-lg shadow-sm text-center">
        <h1 class="text-6xl font-bold text-red-300">403</h1>
        <div class="x-logo mt-6"></div>
        <h2 class="text-2xl mt-4">Interdit</h2>
        <p class="text-lg mt-2 text-gray-300">L'utilisateur n'a pas les bonnes autorisations.</p>
    </div>

</body>

</html>
