<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Article;
use App\Repository\ArticleRepository;

class ArticlesController extends AbstractController
{   
    public function __invoke(ArticleRepository $ArticleRepository): Response
    {
        $articles = $ArticleRepository->findAll();
        return new JsonResponse(count($articles));
    }
}
